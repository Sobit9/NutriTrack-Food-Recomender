import mongoose from "mongoose";
import DFood from "../Database/food.cjs";

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

const searchfood = async (a) => {
  try {
    const food = [];
    await connectDB();
    const foods = await DFood.find();

    food.length = 0;

    for (const item of foods) {
      const j = String(item.food_name);
      if (j.toLowerCase().includes(a.toLowerCase())) {
        food.push(j);
      }
    }
    return food;
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
};

// Use an async function to handle the promise
export default searchfood;
