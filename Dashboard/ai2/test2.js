import { exec } from "child_process";
import fetch from "node-fetch";
import mongoose from "mongoose";
import UFood from "./userfood.cjs";
import RFood from "./recomendedfood.cjs";
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

// Function to start the Python server
function startPythonServer() {
  return new Promise((resolve, reject) => {
    pythonServerProcess = exec(
      "python c:\\Users\\kosul\\Desktop\\Landingpage\\Landingpage\\ai\\model.py",
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error starting Python server: ${error.message}`);
          reject(error);
          return;
        }
        if (stderr) {
          console.error(`Python server stderr: ${stderr}`);
        }
        console.log(`Python server stdout: ${stdout}`);
      }
    );
    // Give the server a moment to start
    setTimeout(() => {
      resolve();
    }, 0); // Adjust this timeout if necessary
  });
}

// Function to get the prediction from the server
async function getPrediction(inputData) {
  try {
    const response = await fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      body: JSON.stringify({ input: inputData }),
    });

    let result = await response.json();
    console.log("Predictions:", result);
    // console.log(inputData);
    return result.predictions;
  } catch (error) {
    console.error("Error:", error);
  }
}

// Function to stop the Python server process
function stopPythonServer() {
  if (pythonServerProcess) {
    pythonServerProcess.kill(); // Kill the process
    console.log("Python server process stopped");
  } else {
    console.log("Python server process not found");
  }
}

// Main function
async function checkdata(input) {
  try {
    await startPythonServer();
    let prediction = await getPrediction(input);
    // console.log("Prediction:", prediction);
    return prediction;
    // Adjust this timeout if necessary
  } catch (error) {
    console.error("Error in main function:", error);
    process.exit(1); // Exit with error status code
  } finally {
    stopPythonServer();
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
          food.nf_sodium,
          food.nf_sugars,
          1,
          1,
          0,
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
      console.log(foodss.length);

      // await UFood.updateOne({ user_id: userId }, { $set: { foods: foodss } });
    } else {
      console.log("User not found");
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
  } finally {
    process.exit(0);
  }
}

// foodsort();

// checkdata();
foodsort();
