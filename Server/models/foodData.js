import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema(
  {
    name: String,
    weight: Number,
    calories: Number,
    protein: Number,
    carbs: Number,
    fats: Number,
    vitamins: String,
    minerals: String,
    category: String,
  },
  { timestamps: true }
);

const Food = mongoose.model("Food", FoodSchema);
export default Food;
