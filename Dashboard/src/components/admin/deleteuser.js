import mongoose from "mongoose";
import User from "../Database/user.cjs";

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

const deleteuser = async (a, b) => {
  try {
    await connectDB();
    const result = await User.deleteOne({ user_id: b, uname: a });
    console.log("User deleted successfully:", result);
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
};

// const j = await searchuser("kosul");
// console.log(j);
// // Use an async function to handle the promise
export default deleteuser;
