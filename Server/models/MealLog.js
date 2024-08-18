import mongoose from "mongoose";

const IntakeStatSchema = new mongoose.Schema(
  {
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
  },
  mealId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Food",
    required: true,
    addedAt: { type: Date, default: Date.now },
},
  category: String,
  foodItems: String,
  totalCalories: Number,
  totalCarbs: Number,
  totalProteins: Number,
  totalFats: Number,
  },
  { timestamps: true }
);

const IntakeStat = mongoose.model("IntakeStat", IntakeStatSchema);
export default IntakeStat;
