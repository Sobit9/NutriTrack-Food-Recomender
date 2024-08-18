import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {type: String, required: true},
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: String, required: true },
    gender: { type: String, required: true, enum: ['male', 'female', 'other'] },
    height: { type: Number, required: true }, // in cm
    weight: { type: Number, required: true }, // in kg
    activityLevel: { type: String, required: true, enum: ['sedentary', 'lightly active', 'moderately active', 'very active', 'extremely active'] },
    dietaryPreferences: { type: [String], enum: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'none'], default: ['none'] },
    bmi: { type: Number, required: false },
    healthIssues: { type: Array, required: false },
    calorieLimit: { type: Number, required: false }, // Daily calorie limit
    carbLimit: { type: Number, required: false }, // Daily carbohydrate limit (grams)
    proteinLimit: { type: Number, required: false }, // Daily protein limit (grams)
    bmr: { type: Number, required: false }, 
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
