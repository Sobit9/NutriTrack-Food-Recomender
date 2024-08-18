import mongoose from "mongoose";

const OverallStatSchema = new mongoose.Schema(
  {
    monthlyData: [
      {
        month: String,
        totalCalories: Number,
  totalCarbs: Number,
  totalProteins: Number,
  totalFats: Number,
      },
    ],
    dailyData: [
      {
        date: String,
        totalCalories: Number,
  totalCarbs: Number,
  totalProteins: Number,
  totalFats: Number,
      },
    ],
  },
  { timestamps: true }
);

const OverallStat = mongoose.model("OverallStat", OverallStatSchema);
export default OverallStat;
