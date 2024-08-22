import mongoose from "mongoose";
import Email from "./email.cjs";

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

const emailadderr = async (email) => {
  try {
    await connectDB(); // Await the connection to ensure it's established before proceeding

    await Email.findOneAndUpdate(
      { email: email },
      { $set: { email: email } },
      { upsert: true, new: true } // new: true returns the updated document
    );
    console.log(`Email ${email} added/updated successfully.`);
  } catch (error) {
    console.error("Error adding/updating email:", error);
  } finally {
    await mongoose.connection.close(); // Await the closure to ensure the connection is closed properly
    console.log("MongoDB connection closed.");
  }
};

export default emailadderr;
