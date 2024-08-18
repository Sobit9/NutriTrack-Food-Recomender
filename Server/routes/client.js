import express from "express";
import {
  getFoods,
  getClients,
  addToFoodLog,
  getFoodLog,
} from "../controllers/client_controller.js";

const router = express.Router();

router.get("/foods", getFoods);
router.get("/addToFoodLog", addToFoodLog);
router.get("/foodLog", getFoodLog)
router.get("/clients", getClients);


export default router;
