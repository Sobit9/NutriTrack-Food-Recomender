import Food from "../models/foodData.js";

import User from "../models/User.js";
// import asyncHandler from "../utils/asyncHandler.js"


export const getClients = async (req, res) => {
  try {
    const clients = await User.find({ role: "user" }).select("-password");
    res.status(200).json(clients);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

