import mongoose from "mongoose";
import Classify from "./datafilter.js";
import UFood from "../src/Components/Database/userfood.cjs";
import DFood from "../src/Components/Database/food.cjs";
import RFood from "../src/Components/Database/recomendedfood.cjs";
import express from "express";
import cors from "cors";

// const bmr = 2330;
// const uid = "kosul";
// const ftype = "nonveg";
// const diab = 1;
// const lbp = 0;
// const hbp = 0;

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

async function diabcheck(inputData) {
  try {
    const response = await fetch("http://localhost:5000/predictdb", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input: inputData }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let result = await response.json();
    return result.predictions;
  } catch (error) {
    console.error("Error:", error);
  }
}
async function saltcheck(inputData) {
  try {
    const response = await fetch("http://localhost:5000/predictbp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    let result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
}

function diabities(a) {
  let j = a.map((subarray) => {
    return subarray.slice(0, 4);
  });
  return j;
}
function salt(a) {
  let j = a.map((subarray) => {
    return [subarray[0], subarray[4]];
  });
  return j;
}

const dcheck = async (a, b) => {
  let j = diabities(a);
  let result = await diabcheck(j);
  for (let i = result.length - 1; i >= 0; i--) {
    if (result[i] == 0) {
      b.splice(i, 1);
    }
  }
  return b;
};

const lcheck = async (a, b) => {
  let j = salt(a);
  let result = await saltcheck(j);
  for (let i = result.length - 1; i >= 0; i--) {
    if (result[i] == 0) {
      b.splice(i, 1);
    }
  }
  return b;
};

const hcheck = async (a, b) => {
  let j = salt(a);
  let result = await saltcheck(j);
  for (let i = result.length - 1; i >= 0; i--) {
    if (result[i] == 1) {
      b.splice(i, 1);
    }
  }
  return b;
};

const sortfood = async (uid, diab, lbp, hbp) => {
  try {
    // Fetch the user's foods from UFood
    const user = await UFood.findOne({ user_id: uid });
    const datacheck = [];
    const foodss = [];
    if (user) {
      const foods2 = [user.foods];
      for (const food of foods2.flat(1)) {
        // console.log(food.user_id);
        datacheck.push([
          food.nf_calories,
          food.nf_protein,
          food.nf_total_carbohydrate,
          food.nf_sugars,
          food.nf_sodium,
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
        let result = await dcheck(datacheck, foodss);
        console.log(result.length);
        if (foodss.length !== 0) {
          await RFood.findOneAndUpdate(
            { user_id: user.user_id },
            { $set: { foods: result } },
            { upsert: true, new: true }
          );
        }
      } else if (diab == 0 && lbp == 1 && hbp == 0) {
        let result = await lcheck(datacheck, foodss);
        console.log("lcheck", result.length);
        if (result.length !== 0) {
          await RFood.findOneAndUpdate(
            { user_id: user.user_id },
            { $set: { foods: result } },
            { upsert: true, new: true }
          );
        }
      } else if (diab == 0 && lbp == 0 && hbp == 1) {
        let result = await hcheck(datacheck, foodss);
        console.log("hcheck", result.length);
        if (result.length !== 0) {
          await RFood.findOneAndUpdate(
            { user_id: user.user_id },
            { $set: { foods: result } },
            { upsert: true, new: true }
          );
        }
      } else if (diab == 1 && lbp == 1 && hbp == 0) {
        let result1 = await lcheck(datacheck, foodss);

        let datacheck2 = [];
        for (const food of result1.flat(1)) {
          datacheck2.push([
            food.nf_calories,
            food.nf_protein,
            food.nf_total_carbohydrate,
            food.nf_sugars,
          ]);
        }
        let result2 = await dcheck(datacheck2, result1);
        if (result2.length !== 0) {
          await RFood.findOneAndUpdate(
            { user_id: user.user_id },
            { $set: { foods: result } },
            { upsert: true, new: true }
          );
        }
      } else if (diab == 1 && lbp == 0 && hbp == 1) {
        let result1 = await hcheck(datacheck, foodss);

        let datacheck2 = [];
        for (const food of result1.flat(1)) {
          datacheck2.push([
            food.nf_calories,
            food.nf_protein,
            food.nf_total_carbohydrate,
            food.nf_sugars,
          ]);
        }
        let result2 = await dcheck(datacheck2, result1);
        if (result2.length !== 0) {
          await RFood.findOneAndUpdate(
            { user_id: user.user_id },
            { $set: { foods: result2 } },
            { upsert: true, new: true }
          );
        }
      }
    } else {
      console.log("User not found");
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};

const closeconnection = async (bmr, uid, ftype, diab, lbp, hbp) => {
  await connectDB();
  try {
    await classifyresult(bmr, uid, ftype);
  } catch (error) {
    console.error("MongoDB connection close error:", error.message);
  } finally {
    try {
      await sortfood(uid, diab, lbp, hbp);
    } catch (error) {
      console.error("MongoDB connection close error:", error.message);
    } finally {
      await mongoose.connection.close();
      console.log("MongoDB connection closed");
    }
  }
};

// closeconnection(bmr, uid, ftype, diab, lbp, hbp);

export default closeconnection;
