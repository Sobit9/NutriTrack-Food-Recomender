import mongoose from "mongoose";

const IntakeStatSchema = new mongoose.Schema(
  {
  //   userId:{
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User",
  //     required: true,
  // },
//   mealId:{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Food",
//     required: true,
//     addedAt: { type: Date, default: Date.now },
// },
foodName: { type: String, required: true },
servingQty: { type: Number, required: true },
servingUnit: { type: String, required: true },
servingWeightGrams: { type: Number, required: true },
calories: { type: Number, required: true },
protein: { type: Number, required: true },
fat: { type: Number, required: true },
carbs: { type: Number, required: true },
cholesterol: { type: Number, required: true },
sodium: { type: Number, required: true },
sugars: { type: Number, required: true },
potassium: { type: Number, required: true },
photo: { type: String, required: true }
  },
  { timestamps: true }
);

const IntakeStat = mongoose.model("IntakeStat", IntakeStatSchema);
export default IntakeStat;
