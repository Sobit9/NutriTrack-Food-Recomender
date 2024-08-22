import mongoose from "mongoose";
import DFood from "./food.cjs";
import fs from "fs";

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

async function foodsort() {
  try {
    await connectDB();
    let datacheck = [];
    const foods = await DFood.find();
    const foodss = [];
    for (const food of foods) {
      // console.log(food.user_id);
      datacheck.push([
        food.nf_calories,
        food.nf_protein,
        food.nf_total_carbohydrate,
        food.nf_sodium,
        food.nf_sugars,
      ]);
      foodss.push(food);
    }

    const jsonData = JSON.stringify(datacheck, null, 2);
    fs.writeFile("datacheck.js", jsonData, (err) => {
      if (err) {
        console.error("Error writing file", err);
      } else {
        console.log("File has been saved");
      }
    });

    for (let i = result.length - 1; i >= 0; i--) {
      if (result[i] == 0) {
        foodss.splice(i, 1);
      }
    }
    console.log(foodss.length);

    // await UFood.updateOne({ user_id: userId }, { $set: { foods: foodss } });
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

foodsort();
