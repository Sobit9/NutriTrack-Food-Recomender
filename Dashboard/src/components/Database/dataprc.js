import mongoose from "mongoose";
import Classify from "./datafilter.js";
import UFood from "./userfood.cjs";
import DFood from "./food.cjs";
import RFood from "./recomendedfood.cjs";
import express from "express";
import cors from "cors";

const bmr = 2200;

const app = express();
app.use(express.json());
app.use(cors());

const mongoURI =
  "mongodb+srv://kosul:kosul@cluster0.jn30nsv.mongodb.net/?retryWrites=true&w=majority&appName=nutriTrack";

// Connect to MongoDB
const connectDB = async () => {
  try {
    console.log("MongoDB URI:", mongoURI);

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

// fetchAndLogData();
const classifyresult = async (bmr, userid, ftype) => {
  try {
    const foods = await DFood.find(); // Fetch all documents from the collection

    const generateRandomString = (length) => {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
      }
      return result;
    };
    const updateData = [];
    const existingFoods =
      (await UFood.findOne({ user_id: userid }))?.foods || [];
    for (const food of foods) {
      const foodCategory = Classify(bmr, food.nf_calories);
      const newData = {
        user_id: userid,
        food_name: food.food_name,
        food_id: generateRandomString(10),
        food_category: foodCategory,
        food_type: food.food_type,
        nf_calories: food.nf_calories,
        nf_total_fat: food.nf_total_fat,
        nf_sodium: food.nf_sodium,
        nf_total_carbohydrate: food.nf_total_carbohydrate,
        nf_sugars: food.nf_sugars,
        nf_protein: food.nf_protein,
        food_rating: food.food_rating,
      };

      // Add to update array if the food category is not "0"
      const isAlreadyAdded = existingFoods.some(
        (existingFood) =>
          existingFood.food_name === newData.food_name &&
          existingFood.nf_calories === newData.nf_calories
      );

      if (!isAlreadyAdded && foodCategory !== "0") {
        if (
          (ftype === "veg" && ftype === food.food_type) ||
          ftype === "nonveg"
        ) {
          updateData.push(newData);
        }
      }
    }

    // Perform the bulk update if there is new data to add
    if (updateData.length > 0) {
      await UFood.findOneAndUpdate(
        { user_id: userid },
        { $push: { foods: { $each: updateData } } },
        { upsert: true, new: true }
      );
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};

const sortfood = async (uid, diab, lbp, hbp) => {
  const foodss = [];
  try {
    // Fetch the user's foods from UFood
    const user = await UFood.findOne({ user_id: uid });
    const foodss = [];

    if (user) {
      const existingFoods =
        (await RFood.findOne({ user_id: uid }))?.foods || [];

      for (const food of user.foods) {
        const cal = food.nf_calories;
        const carb = food.nf_total_carbohydrate;
        const prot = food.nf_protein;
        const sod = food.nf_sodium;
        const sug = food.nf_sugars;

        // Check if the food item already exists in the target collection
        const isAlreadyAdded = existingFoods.some(
          (existingFood) => existingFood.food_name === food.food_name
        );

        if (!isAlreadyAdded) {
          // Apply conditions for various dietary requirements
          if (diab == 0 && lbp == 0 && hbp == 0) {
            foodss.push(food);
          }
          // For diabetes
          if (diab == 1 && lbp == 0 && hbp == 0) {
            const abs = Math.abs(carb - prot);
            if (cal >= 300 && cal <= 700 && abs <= 40 && sug < 8) {
              foodss.push(food);
            } else if (cal > 700 && cal <= 1000 && abs <= 50 && sug < 11) {
              foodss.push(food);
            } else if (cal > 1000 && cal <= 1200 && abs <= 55 && sug < 13) {
              foodss.push(food);
            } else if (cal > 1200 && cal <= 1400 && abs <= 60 && sug < 15) {
              foodss.push(food);
            }
          }
          // For low blood pressure
          if (diab == 0 && lbp == 1 && hbp == 0) {
            if (cal >= 300 && cal <= 700 && sod >= 700) {
              foodss.push(food);
            } else if (cal > 700 && cal <= 1000 && sod >= 750) {
              foodss.push(food);
            } else if (cal > 1000 && cal <= 1200 && sod >= 800) {
              foodss.push(food);
            } else if (cal > 1200 && cal <= 1500 && sod >= 850) {
              foodss.push(food);
            }
          }
          // For high blood pressure
          if (diab == 0 && lbp == 0 && hbp == 1) {
            if (cal >= 300 && cal <= 700 && sod < 700) {
              foodss.push(food);
            } else if (cal > 700 && cal <= 1000 && sod < 750) {
              foodss.push(food);
            } else if (cal > 1000 && cal <= 1200 && sod < 800) {
              foodss.push(food);
            } else if (cal > 1200 && cal <= 1500 && sod < 850) {
              foodss.push(food);
            }
          }
          // For diabetes and low blood pressure
          if (diab == 1 && lbp == 1 && hbp == 0) {
            const abs = Math.abs(carb - prot);
            if (
              cal >= 300 &&
              cal <= 700 &&
              abs <= 40 &&
              sod >= 700 &&
              sug < 8
            ) {
              foodss.push(food);
            } else if (
              cal > 700 &&
              cal <= 1000 &&
              abs <= 50 &&
              sod >= 750 &&
              sug < 11
            ) {
              foodss.push(food);
            } else if (
              cal > 1000 &&
              cal <= 1200 &&
              abs <= 55 &&
              sod >= 800 &&
              sug < 13
            ) {
              foodss.push(food);
            } else if (
              cal > 1200 &&
              cal <= 1500 &&
              abs <= 60 &&
              sod >= 850 &&
              sug < 15
            ) {
              foodss.push(food);
            }
          }
          // For diabetes and high blood pressure
          if (diab == 1 && lbp == 0 && hbp == 1) {
            const abs = Math.abs(carb - prot);
            if (cal >= 300 && cal <= 700 && abs <= 40 && sod < 700 && sug < 8) {
              foodss.push(food);
            } else if (
              cal > 700 &&
              cal <= 1000 &&
              abs <= 50 &&
              sod < 750 &&
              sug < 11
            ) {
              foodss.push(food);
            } else if (
              cal > 1000 &&
              cal <= 1200 &&
              abs <= 55 &&
              sod < 800 &&
              sug < 13
            ) {
              foodss.push(food);
            } else if (
              cal > 1200 &&
              cal <= 1500 &&
              abs <= 60 &&
              sod < 850 &&
              sug < 15
            ) {
              foodss.push(food);
            }
          }
        }
      }
    }

    // Perform the bulk update if there's new data to add
    if (foodss.length > 0) {
      await RFood.findOneAndUpdate(
        { user_id: uid },
        { $push: { foods: { $each: foodss } } },
        { upsert: true, new: true }
      );
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
  console.log(foodss.length);
};

const closeconnection = async () => {
  await connectDB();
  try {
    await classifyresult(bmr, "ganesh", "nonveg");
  } catch (error) {
    console.error("MongoDB connection close error:", error.message);
  } finally {
    try {
      await sortfood("gaensh", 0, 0, 1);
    } catch (error) {
      console.error("MongoDB connection close error:", error.message);
    } finally {
      await mongoose.connection.close();
      console.log("MongoDB connection closed");
    }
  }
};

closeconnection();

export default connectDB;
