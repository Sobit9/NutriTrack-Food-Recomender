import User from "../models/User.js";
import OverallStat from "../models/OverallStat.js";
import IntakeStat from "../models/MealLog.js";
// import IntakeStat from './../models/MealLog';

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    // hardcoded values
    const currentMonth = "May";
    const currentYear = 2023;
    const currentDay = "2023-05-15";
const userId = User._id;
    /* Recent Log of Foods */
    const foodLog = await IntakeStat.findById(userId)
      .limit(50)
      .sort({ createdOn: -1 });

    /* Overall Stats */
    const overallStat = await OverallStat.find({ year: currentYear });

    const {
      dailyData,
      monthlyData,
    } = overallStat[0];

    const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
      return month === currentMonth;
    });

    const todayStats = overallStat[0].dailyData.find(({ date }) => {
      return date === currentDay;
    });

    res.status(200).json({
      dailyData,
      monthlyData,
      thisMonthStats,
      todayStats,
      foodLog,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
