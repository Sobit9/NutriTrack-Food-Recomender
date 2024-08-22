import { exec } from "child_process";
import fetch from "node-fetch";
import mongoose, { set } from "mongoose";
import UFood from "../src/Components/Database/userfood.cjs";
import RFood from "../src/Components/Database/recomendedfood.cjs";
// Global variable to store the Python server process handle
let pythonServerProcess = null;

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

async function getPrediction(inputData) {
  try {
    const response = await fetch("http://localhost:5000/predict", {
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
    console.log("Predictions:", result.predictions);
    // console.log(inputData);
    return result.predictions;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function checkdata(input) {
  try {
    let prediction = await getPrediction(input);
    return prediction;
  } catch (error) {
    console.error("Error in main function:", error);
    process.exit(1); // Exit with error status code
  }
}

async function foodsort() {
  try {
    await connectDB();
    let datacheck = [];

    const userId = "kosul";

    const user = await UFood.findOne({ user_id: userId });
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
      // console.log(datacheck);
      let result = await checkdata(datacheck);
      console.log(result.length);

      for (let i = result.length - 1; i >= 0; i--) {
        if (result[i] == 0) {
          foodss.splice(i, 1);
        }
      }
      // if (foodss.length < result.length) {
      //   if (foodss.length !== 0) {
      //     await RFood.findOneAndUpdate(
      //       { user_id: user.user_id },
      //       { $push: { foods: foodss } },
      //       { upsert: true, new: true }
      //     );
      //   }
      // }
      console.log(foodss.length);
    } else {
      console.log("User not found");
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

// foodsort();

// checkdata();
const closeconnection = async () => {
  try {
    await foodsort();
  } catch (error) {
    console.error("MongoDB connection close error:", error.message);
  } finally {
    try {
      await mongoose.connection.close();
      console.log("MongoDB connection closed");
    } catch (error) {
      console.error("MongoDB connection close error:", error.message);
    }
  }
};

const Main = async () => {
  try {
    await closeconnection();
  } catch (error) {
    console.error("Error in main function:", error);
  } finally {
    process.exit(0);
  }
};

Main();
