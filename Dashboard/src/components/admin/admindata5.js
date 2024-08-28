import mongoose from "mongoose";
import DFood from "../Database/food.cjs";

const mongoURI =
  "mongodb+srv://kosul:kosul@cluster0.jn30nsv.mongodb.net/?retryWrites=true&w=majority&appName=nutriTrack";

// Connect to MongoDB
const connectDB = async () => {
  try {
    console.log("MongoDB URI:", mongoURI);
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

const data5 = async () => {
  try {
    const food = [];
    await connectDB();
    const foods = await DFood.find();

    food.length = 0;
    const countFoodTypes = async (data) => {
      let vegCount = 0;
      let nonVegCount = 0;

      data.forEach((item) => {
        if (item.food_type == "veg") {
          vegCount++;
        } else if (item.food_type == "nonveg") {
          nonVegCount++;
        }
      });

      return [vegCount, nonVegCount];
    };

    const countcal = async (data) => {
      let below300 = 0;
      let between300and700 = 0;
      let between700and900 = 0;
      let between900and1200 = 0;
      let above1200 = 0;

      data.forEach((item) => {
        if (item.nf_calories < 300) {
          below300++;
        }
        if (item.nf_calories >= 300 && item.nf_calories < 700) {
          between300and700++;
        }
        if (item.nf_calories >= 700 && item.nf_calories < 900) {
          between700and900++;
        }
        if (item.nf_calories >= 900 && item.nf_calories < 1200) {
          between900and1200++;
        }
        if (item.nf_calories >= 1200) {
          above1200++;
        }
      });

      return [
        below300,
        between300and700,
        between700and900,
        between900and1200,
        above1200,
      ];
    };

    const countNumbersInRanges = async (data) => {
      let below500 = 0;
      let between500and1200 = 0;
      let between600and1300 = 0;

      data.forEach((item) => {
        if (item.nf_calories < 500) {
          below500++;
        }
        if (item.nf_calories >= 500 && item.nf_calories <= 1200) {
          between500and1200++;
        }
        if (item.nf_calories >= 600 && item.nf_calories <= 1300) {
          between600and1300++;
        }
      });

      return [below500, between500and1200, between600and1300];
    };

    const countdate = async (data) => {
      let at2024 = 0;
      let at2023 = 0;
      let at2022 = 0;

      data.forEach((item) => {
        if (item.date == "2024") {
          at2024++;
        }
        if (item.date == "2023") {
          at2023++;
        }
        if (item.date == "2022") {
          at2022++;
        }
      });
      const after2022 = at2022 + at2023;
      const after2023 = after2022 + at2024;

      return [at2022, after2022, after2023];
    };

    const data5 = await countFoodTypes(foods);
    const data6 = await countcal(foods);
    const data7 = await countNumbersInRanges(foods);
    const data8 = await countdate(foods);
    food.push(data5, data6, data7, data8);
    return food;
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
};

// Use an async function to handle the promise
export default data5;
