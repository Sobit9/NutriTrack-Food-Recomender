import express from "express";
import cors from "cors";
import foodsort from "./foodsort.js"; // Adjust the import if necessary
import closeconnection from "../../../ai/dataprc copy.js";
import emailadderr from "../Database/emailadder.js";
import emailsend from "../admin/emailsender.js";
import searchfood from "../admin/searchfood.js";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/fetchmeal", async (req, res) => {
  try {
    const bmr = req.query.bmr || 2330;
    const uid = req.query.uid || "kosul";
    const ftype = req.query.ftype || "nonveg";
    const diab = req.query.diab || 1;
    const lbp = req.query.lbp || 0;
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

app.listen(4000, () => {
  console.log("Server is running on port 3000");
});
