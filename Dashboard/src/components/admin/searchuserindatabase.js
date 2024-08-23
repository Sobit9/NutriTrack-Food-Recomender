import mongoose from "mongoose";
import User from "../Database/userfind.cjs";

// Connect to MongoDB
const js = "mongodb://localhost:27017/nutritiontracker "
const connectDB = async () => {
  try {
    await mongoose.connect(js, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

const searchuserindatabase = async (a,b) => {
  try {
    const user = [];
    await connectDB();
    const users = await User.find();

    user.length = 0;

    for (const item of users) {
        if (item.email == a && item.password == b) {
            user.push(item)
      }
    }
    return user;
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
};

// const j = await searchuserindatabase("asxdfg@example.com", "asxdfg")

// if(j){
//     console.log(j)
// }

// Use an async function to handle the promise
export default searchuserindatabase;
