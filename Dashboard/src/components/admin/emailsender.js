import nodemailer from "nodemailer";
import mongoose from "mongoose";
import Email from "../Database/email.cjs"; // Ensure this path is correct

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

// Setup email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "gurungkosul@gmail.com", // Replace with your email
    pass: "knae bzsb mmcq cfab", // Replace with your password or use environment variables
  },
});

// Send email function
const sendEmail = async (to, subject, message) => {
  const mailOptions = {
    from: "gurungkosul@gmail.com", // Replace with your email
    to,
    subject,
    text: message,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}:`, info.response);
  } catch (error) {
    console.error(`Error sending email to ${to}:`, error);
  }
};

// Main function to fetch users and send emails
const emailsend = async (subject, message) => {
  try {
    await connectDB();
    const users = await Email.find();
    const receiverList = users.map((user) => user.email);

    for (const receiver of receiverList) {
      await sendEmail(receiver, subject, message);
    }
  } catch (error) {
    console.error("Error processing emails:", error);
  } finally {
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
  }
};

export default emailsend;
