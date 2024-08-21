import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema(
  {
    foodName: { type: String, required: true },
  foodBrand: { type: String, default: null },
  servingQty: { type: Number, required: true },
  servingUnit: { type: String, required: true },
  servingWeightGrams: { type: Number, required: true },
  calories: { type: Number, required: true },
  totalFat: { type: Number, required: true },
  saturatedFat: { type: Number, required: true },
  cholesterol: { type: Number, required: true },
  sodium: { type: Number, required: true },
  totalCarbohydrate: { type: Number, required: true },
  dietaryFiber: { type: Number, required: true },
  sugars: { type: Number, required: true },
  protein: { type: Number, required: true },
  potassium: { type: Number, required: true },
  photo: {
    thumb: { type: String, default: null },
    highres: { type: String, default: null },
    isUserUploaded: { type: Boolean, default: false }
  }
},
  { timestamps: true }
);

const Food = mongoose.model("Food", FoodSchema);
export default Food;
