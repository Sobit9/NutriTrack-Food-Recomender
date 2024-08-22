//training data model
const mongoose = require("mongoose");

const td = new mongoose.Schema({
  ucal: { type: Number, required: true },
  fcal: { type: Number, required: true },
  diabities: { type: Number, required: true },
  irondef: { type: Number, required: true },
  lbp: { type: Number, required: true },
  hbp: { type: Number, required: true },
  fat: { type: Number, required: true },
  carb: { type: Number, required: true },
  protein: { type: Number, required: true },
  salt: { type: Number, required: true },
  sugar: { type: Number, required: true },
});

const trainigdata = mongoose.model("Trainigdata", td);

module.exports = trainigdata;
