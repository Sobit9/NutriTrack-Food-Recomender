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

const adduser22 = async (userData) => {
    try {
      await connectDB(); // Connect to the database
  
      // Create a new user instance
      const newUser = new User(userData);
  
      // Save the user to the database
      const savedUser = await newUser.save();
      
      console.log('User added successfully:', savedUser);
      return savedUser; // Return the saved user
  
    } catch (error) {
      console.error("Error adding user:", error);
    } finally {
      await mongoose.connection.close(); // Close the MongoDB connection
      console.log("MongoDB connection closed");
    }
  };

// const j = await searchuserindatabase("asxdfg@example.com", "asxdfg")

// if(j){
//     console.log(j)
// }

// Use an async function to handle the promise
export default adduser22;
