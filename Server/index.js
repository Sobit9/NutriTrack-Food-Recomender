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
import FoodRoutes from "./routes/food.js";
import FoodLogRoutes from "./routes/foodLog.js";
import foodsort from "../Dashboard/src/components/router/foodsort.js"; // Adjust the import if necessary
import closeconnection from "../Dashboard/ai/dataprc copy.js";
import emailadderr from "..//Dashboard/src/components/Database/emailadder.js";
import emailsend from "..//Dashboard/src/components/admin/emailsender.js";
import searchfood from "..//Dashboard/src/components/admin/searchfood.js";
// import searchuserindatabase from "..//Dashboard/src/components/admin/searchuserindatabase.js";
// import adduser22 from "..//Dashboard/src/components/admin/adduser.js";
// data imports
// import User from "./models/User.js";
// import Food from "./models/foodData.js";
// import IntakeStat from "./models/MealLog.js";
// import OverallStat from "./models/OverallStat.js";


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
app.use("/food", FoodRoutes);
app.use("/foodLog", FoodLogRoutes);

// AI
app.get("/fetchmeal", async (req, res) => {
  try {
    const bmr = req.query.bmr || 2530;
    const uid = req.query.uid || "ganesh";
    const ftype = req.query.ftype || "nonveg";
    const diab = req.query.diab || 0;
    const lbp = req.query.lbp || 1;
    const hbp = req.query.hbp || 0;
    await closeconnection(bmr, uid, ftype, diab, lbp, hbp);
    const data = await foodsort(uid);
    res.status(200).json(data);
    console.log(diab, lbp, hbp);
  } catch (error) {
    console.error("Error fetching meal:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/email", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    await emailadderr(email);
    res.status(200).json({ message: "Email added/updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding/updating email", error });
  }
});

app.post("/sendmail", async (req, res) => {
  const { subject, message } = req.body;
  if (!subject || !message) {
    return res
      .status(400)
      .json({ message: "Subject and message are required" });
  }

  try {
    await emailsend(subject, message);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error sending email", error });
  }
});

app.post("/foodsearch", async (req, res) => {
  try {
    const { search } = req.body;
    const food = await searchfood(search);
    console.log(food);
    res.status(200).json({ food });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await mongoose.connection.close();
  }
});

app.post("/register2", async (req, res) => {
  try {
    const data = req.body;
    console.log(user);
    await adduser22(data)
    res.status(200).json({  user });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});


// app.post("/gotodashboard", async (req, res) => {
//   try {
//     const { email } = req.body;
//     const {password } = req.body;
//     const user = await searchuserindatabase(email, password);
//     console.log(user);
//     res.status(200).json({  user });
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 5001;



app.listen(PORT, () => {
  console.log("success: server is running on port", PORT)
  connectToDB()
})



