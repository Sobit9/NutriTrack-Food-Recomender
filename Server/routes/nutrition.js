import express from "express";
import { getNutrition } from "../controllers/nutrition_controller.js";

const router = express.Router();

router.get("/nutritions", getNutrition);

export default router;