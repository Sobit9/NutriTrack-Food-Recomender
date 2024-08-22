import mongoose from "mongoose";
import RFood from "../Database/recomendedfood.cjs";

const mongoURI =
  "mongodb+srv://kosul:kosul@cluster0.jn30nsv.mongodb.net/?retryWrites=true&w=majority&appName=nutriTrack";

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // Exit process on failure
  }
};

const closeConn = async () => {
  try {
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  } catch (error) {
    console.error("MongoDB connection close error:", error.message);
  }
};

const takeFood = async (userId) => {
  await connectDB();
  console.log("Connected to MongoDB");

  try {
    const user = await RFood.findOne({ user_id: userId });
    const breakfast = [];
    const lunch = [];
    const dinner = [];
    const data = [];

    if (user) {
      for (const food of user.foods) {
        if (food.food_category === "B") {
          breakfast.push(food);
        } else if (food.food_category === "L") {
          lunch.push(food);
        } else if (food.food_category === "D") {
          dinner.push(food);
        }
      }

      const randomB =
        breakfast.length > 0
          ? Math.floor(Math.random() * breakfast.length)
          : null;
      const randomL =
        lunch.length > 0 ? Math.floor(Math.random() * lunch.length) : null;
      const randomD =
        dinner.length > 0 ? Math.floor(Math.random() * dinner.length) : null;

      if (randomB !== null) data.push(breakfast[randomB]);
      if (randomL !== null) data.push(lunch[randomL]);
      if (randomD !== null) data.push(dinner[randomD]);
    }

    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return [];
  } finally {
    await closeConn();
  }
};

const foodSort = async (userId) => {
  const data = await takeFood(userId);
  return data;
};

export default foodSort;
