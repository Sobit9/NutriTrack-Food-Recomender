// backend/models/Food.js
const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
  food_name: { type: String, required: true },
  serving_qty: { type: Number, required: true },
  serving_unit: { type: String, required: true },
  food_type: { type: String, required: true },
  serving_weight_grams: { type: Number, required: true },
  nf_calories: { type: Number, required: true },
  nf_total_fat: { type: Number, required: true },
  nf_saturated_fat: { type: Number, required: true },
  nf_cholesterol: { type: Number, required: true },
  nf_sodium: { type: Number, required: true },
  nf_total_carbohydrate: { type: Number, required: true },
  nf_dietary_fiber: { type: Number, required: true },
  nf_sugars: { type: Number, required: true },
  nf_protein: { type: Number, required: true },
  nf_potassium: { type: Number, required: true },
  nf_iron: { type: Number, required: false },
  date: { type: String, required: false },
});

const DFood = mongoose.model("Food", FoodSchema);

module.exports = DFood;
