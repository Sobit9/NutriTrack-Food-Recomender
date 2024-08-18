import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import NutritionRoutes from "./routes/nutrition.js";
import AuthRoutes from "./routes/auth-routes.js";

// data imports
import User from "./models/User.js";
import Food from "./models/foodData.js";
import IntakeStat from "./models/MealLog.js";
import OverallStat from "./models/OverallStat.js";


//database
import connectToDB from "./utils/db.js";

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(
  express.urlencoded({
  extended: true,
})
)

/* Authorization */
app.use(AuthRoutes);

/* ROUTES */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/nutrition", NutritionRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log("success: server is running on port", PORT)
  connectToDB()
})



