import Food from "../models/foodData.js";
import IntakeStat from "../models/MealLog.js";
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js"
export const getFoods = async (req, res) => {
  try {
    const foods = await Food.find();

    const foodsWithStats = await Promise.all(
      foods.map(async (food) => {
        const stat = await IntakeStat.find({
          foodId: food._id,
        });
        return {
          ...food._doc,
          stat,
        };
      })
    );

    res.status(200).json(foodsWithStats);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getClients = async (req, res) => {
  try {
    const clients = await User.find({ role: "user" }).select("-password");
    res.status(200).json(clients);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addToFoodLog = asyncHandler(async (req, res) => {
  const {userId} = req.user;
  const { mealId} = req.body;
  try {
    const user = await IntakeStat.findById(userId);
    const alreadyadded = user.findByIdAndUpdate((id) => id.toString() === mealId);
    if (alreadyadded) {
      let user = await IntakeStat.findByIdAndUpdate(
        _id,
        {
          $pull: { foodLogged: mealId},
        },
        {new: true,}
      );
      res.json(user);
    } else {
      let user = await IntakeStat.findByIdAndUpdate(
        _id,
        {
          $push: { foodLogged: mealId},
        },
        {new: true,}
      );
      res.json(user);
    }
  } catch (err) {
    throw new Error(err);
  }
})

export const getFoodLog = async (req, res) => {
  try {
    const { userId } = req.params;
    const foodlog = await IntakeStat.findOne({ userId }).populate('foodLogged.mealId');

    res.status(200).json(foodlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
