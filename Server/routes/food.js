import axios from "axios";
import dotenv from 'dotenv';
import authenticate from "../middleware/authenticate.js"
import express from "express";
const router = express.Router();

dotenv.config();
const NUTRITIONIX_APP_ID = process.env.NUTRITIONIX_APP_ID;
const NUTRITIONIX_API_KEY = process.env.NUTRITIONIX_API_KEY; 


router.get('/search/:query', async (req, res) => {
  const query = req.params.query;
  try {
    const response = await axios.get(`https://trackapi.nutritionix.com/v2/search/instant`, {
      params: { query },
      headers: {
        'x-app-id': NUTRITIONIX_APP_ID,
        'x-app-key': NUTRITIONIX_API_KEY
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

// Route to get detailed nutritional information
router.get('/item/:foodName', async (req, res) => {
  const foodName = req.params.foodName;
  try {
    const response = await axios.post(`https://trackapi.nutritionix.com/v2/natural/nutrients`, {
      query: foodName
    }, {
      headers: {
        'x-app-id': NUTRITIONIX_APP_ID,
        'x-app-key': NUTRITIONIX_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    const foodData = response.data.foods[0];
    const foodInfo = {
      foodName: foodData.food_name,
      servingQty: foodData.serving_qty,
      servingUnit: foodData.serving_unit,
      servingWeightGrams: foodData.serving_weight_grams,
      calories: foodData.nf_calories,
      protein: foodData.nf_protein,
      fat: foodData.nf_total_fat,
      carbs: foodData.nf_total_carbohydrate,
      cholesterol: foodData.nf_cholesterol,
      sodium: foodData.nf_sodium,
      sugars: foodData.nf_sugars,
      potassium: foodData.nf_potassium,
      photo: foodData.photo.thumb
      // photo: {
      //   thumb: foodData.photo.thumb,
      //   highres: foodData.photo.highres,
      //   isUserUploaded: false // Assuming this will be set to false for API data
      // }
    };

    res.json(foodInfo);
    console.log(foodInfo);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

// Add a new food item - ensure all nutritional values are provided
router.post('/', async (req, res) => {
  const { name, servingQty, servingUnit, servingWeightGrams, calories, protein, fat, carbs, cholesterol, sodium, sugars, potassium, photo } = req.body;

  if (!name || servingQty == undefined || !servingUnit || servingWeightGrams === undefined || calories === undefined || protein === undefined || fat === undefined || carbs === undefined || cholesterol === undefined || sodium === undefined || sugars === undefined || potassium === undefined || !photo) {
    return res.status(400).json({ error: 'All nutritional values are required.' });
  }

  try {
    const food = new Food({
      foodName: name,
      servingQty,
      servingUnit,
      servingWeightGrams,
      calories,
      protein,
      totalFat: fat,
      totalCarbohydrate: carbs,
      cholesterol,
      sodium,
      sugars,
      potassium,
      photo
    });

    await food.save();
    res.status(201).json(food);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get food item by name
router.get('/:name', async (req, res) => {
  try {
    const food = await Food.findOne({ foodName: req.params.name });
    if (!food) {
      return res.status(404).json({ message: 'Food item not found' });
    }
    res.json(food);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to fetch and store food items - only for authenticated users
router.post('/addFood', authenticate, async (req, res) => {
  const { query } = req.body;

  try {
    const response = await axios.post('https://trackapi.nutritionix.com/v2/natural/nutrients', {
      query
    }, {
      headers: {
        'x-app-id': NUTRITIONIX_APP_ID,
        'x-app-key': NUTRITIONIX_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    const foodData = response.data.foods[0];

    if (!foodData.food_name || foodData.serving_qty === undefined || !foodData.serving_unit || foodData.serving_weight_grams === undefined || foodData.nf_calories === undefined || foodData.nf_protein === undefined || foodData.nf_total_fat === undefined || foodData.nf_total_carbohydrate === undefined) {
      return res.status(400).json({ error: 'All nutritional values are required from the API.' });
    }

    const food = new Food({
      foodName: foodData.food_name,
      servingQty: foodData.serving_qty,
      servingUnit: foodData.serving_unit,
      servingWeightGrams: foodData.serving_weight_grams,
      calories: foodData.nf_calories,
      protein: foodData.nf_protein,
      totalFat: foodData.nf_total_fat,
      totalCarbohydrate: foodData.nf_total_carbohydrate,
      cholesterol: foodData.nf_cholesterol,
      sodium: foodData.nf_sodium,
      sugars: foodData.nf_sugars,
      potassium: foodData.nf_potassium,
      photo: {
        thumb: foodData.photo.thumb,
        highres: foodData.photo.highres,
        isUserUploaded: false // Assuming this will be set to false for API data
      }
    });

    await food.save();
    res.status(201).json(food);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const commonFoodQueries = [
  'apple',
  'soup',
  'salad',
  'steak',
  'chicken',
  'pizza',
  'rice',
  'burger',
  'pasta',
  'sandwich',
  // Add more common food queries here as needed
];

const getRandomFoods = async (req, res) => {
  try {
    // Randomly select a query from commonFoodQueries
    const randomQuery = commonFoodQueries[Math.floor(Math.random() * commonFoodQueries.length)];

    // Make request to Nutritionix API
    const response = await axios.get('https://trackapi.nutritionix.com/v2/search/instant', {
      params: {
        query: randomQuery,
        common: true,
        branded: false,
      },
      headers: {
        'x-app-id': NUTRITIONIX_API_ID,
        'x-app-key': NUTRITIONIX_API_KEY,
      },
    });

    const commonFoods = response.data.common;

    if (commonFoods.length === 0) {
      return res.status(404).json({ error: 'No common foods found' });
    }

    const randomFoods = [];

    const numRandomFoods = Math.min(10, commonFoods.length);
    for (let i = 0; i < numRandomFoods; i++) {
      const randomIndex = Math.floor(Math.random() * commonFoods.length);
      const foodItem = commonFoods[randomIndex];

      randomFoods.push({
        food_name: foodItem.food_name,
        serving_unit: foodItem.serving_unit,
        photo_thumb: foodItem.photo?.thumb,
      });

      commonFoods.splice(randomIndex, 1);
    }

    res.status(200).json(randomFoods);
  } catch (error) {
    console.error('Error fetching random common foods:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch random foods' });
  }
};

router.get('/random', getRandomFoods);

export default router