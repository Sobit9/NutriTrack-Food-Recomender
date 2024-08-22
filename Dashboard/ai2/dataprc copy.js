import mongoose from "mongoose";
import Classify from "./datafilter.js";
import UFood from "./userfood.cjs";
import DFood from "./food.cjs";
import RFood from "./recomendedfood.cjs";
import express from "express";
import cors from "cors";

const bmr = 2330;

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
      if (foodCategory !== "0") {
        updateData.push(newData);
      }
    }

    // Perform the bulk update if there is new data to add
    if (updateData.length > 0) {
      await UFood.findOneAndUpdate(
        { user_id: userid },
        { $set: { foods: updateData } },
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
    const datacheck = [];

    if (user) {
      const foodss = [];
      const foods2 = [user.foods];
      for (const food of foods2.flat(1)) {
        // console.log(food.user_id);
        datacheck.push([
          food.nf_calories,
          food.nf_protein,
          food.nf_total_carbohydrate,
          food.nf_sugars,
        ]);
        foodss.push(food);
      }

      if (diab == 0 && lbp == 0 && hbp == 0) {
        await RFood.findOneAndUpdate(
          { user_id: user.user_id },
          { $set: { foods: foodss } },
          { upsert: true, new: true }
        );
      } else if (diab == 1 && lbp == 0 && hbp == 0) {
        let result = await checkdiab(datacheck);
        console.log(result.length);

        for (let i = result.length - 1; i >= 0; i--) {
          if (result[i] == 0) {
            foodss.splice(i, 1);
          }
        }
        if (foodss.length < result.length) {
          if (foodss.length !== 0) {
            await RFood.findOneAndUpdate(
              { user_id: user.user_id },
              { $push: { foods: foodss } },
              { upsert: true, new: true }
            );
          }
        }
        console.log(foodss.length);
      } else if (diab == 0 && lbp == 1 && hbp == 0) {
      } else if (diab == 0 && lbp == 0 && hbp == 1) {
      }
    } else {
      console.log("User not found");
    }

    // Perform the bulk update if there's new data to add
    if (foodss.length > 0) {
      await RFood.findOneAndUpdate(
        { user_id: uid },
        { $set: { foods: foodss } },
        { upsert: true, new: true }
      );
    }

    console.log(user.foods);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
  console.log(foodss.length);
};

const closeconnection = async () => {
  await connectDB();
  try {
    await classifyresult(bmr, "kosul", "nonveg");
  } catch (error) {
    console.error("MongoDB connection close error:", error.message);
  } finally {
    try {
      await sortfood("kosul", 0, 1, 0);
    } catch (error) {
      console.error("MongoDB connection close error:", error.message);
    } finally {
      await mongoose.connection.close();
      console.log("MongoDB connection closed");
    }
  }
};

closeconnection();
