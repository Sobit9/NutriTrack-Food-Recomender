// backend/index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config(); // Load environment variables from .env file

const app = express();
app.use(express.json());
app.use(cors());

// Import the model
const Food = require("./food.cjs");

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

    // Insert sample data
    await insertSampleData();
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

// Function to insert sample data
const insertSampleData = async () => {
  try {
    const sampleData = {
      food_name: "brussels sprouts",
      serving_qty: 1,
      serving_unit: "cup",
      serving_weight_grams: 88,
      food_type: "veg",
      nf_calories: 38,
      nf_total_fat: 0.3,
      nf_saturated_fat: 0,
      nf_cholesterol: 0,
      nf_sodium: 22,
      nf_total_carbohydrate: 8,
      nf_dietary_fiber: 3.3,
      nf_sugars: 1.9,
      nf_protein: 3,
      nf_potassium: 342,
    };

    const newFood = new Food(sampleData);
    await newFood.save();
    console.log("Sample data inserted successfully");
  } catch (error) {
    console.error("Error inserting data:", error.message);
  }
};

// Call the connectDB function to establish connection
connectDB();
