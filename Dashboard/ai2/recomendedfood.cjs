// backend/models/Food.js
const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  food_name: { type: String, required: true },
  food_id: { type: String, required: true },
  food_category: { type: String, required: true },
  food_type: { type: String, required: true },
  nf_calories: { type: Number, required: true },
  nf_total_fat: { type: Number, required: true },
  nf_sodium: { type: Number, required: true },
  nf_total_carbohydrate: { type: Number, required: true },
  nf_sugars: { type: Number, required: true },
  nf_protein: { type: Number, required: true },
  nf_iron: { type: Number, required: false },
});

const user = new mongoose.Schema({
  user_id: { type: String, required: true },
  user_name: { type: String, required: true },
  bmr: { type: Number, required: true },
  foods: [FoodSchema],
});

const UFood = mongoose.model("Foodrecomendations", user);

module.exports = UFood;
