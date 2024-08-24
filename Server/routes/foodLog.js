import authenticate from "../middleware/authenticate.js"
import express from "express";
import IntakeStat from "../models/MealLog.js"

const router = express.Router();

router.post('/log', async (req, res) => {
    const { foodName, servingQty, servingUnit, servingWeightGrams, calories, protein, fat, carbs, cholesterol, sodium, sugars, potassium, photo } = req.body;
  
    // Log the received payload
    console.log('Received payload:', req.body);
  
    if (!foodName || servingQty === undefined || !servingUnit || servingWeightGrams === undefined || calories === undefined || protein === undefined || fat === undefined || carbs === undefined || cholesterol === undefined || sodium === undefined || sugars === undefined || potassium === undefined || !photo) {
      console.error('Invalid payload:', req.body);
      return res.status(400).json({ error: 'All nutritional values are required.' });
    }
  
    try {
      const foodLog = new IntakeStat({
        // userId: req.user.userId,
        foodName,
        servingQty,
        servingUnit,
        servingWeightGrams,
        calories,
        protein,
        fat,
        carbs,
        cholesterol,
        sodium,
        sugars,
        potassium,
        photo
      });
  
      await foodLog.save();
      res.status(201).json(foodLog);
    } catch (error) {
      console.error('Error saving food log:', error);
      res.status(500).json({ error: error.message });
    }
  });
  
  
  
  // Get user's food logs
  router.get('/logs', async (req, res) => {
    try {
      const { userId } = req.params;
        const mealLogs = await IntakeStat.find({ userId });

        res.status(200).json(mealLogs); 
    } catch (error) {
      console.error("Error fetching meal logs:", error);
      res.status(500).json({ error: error.message });
    }
  });
  
  
  // Update a food log entry
  router.put('/log/:id', async (req, res) => {
    const { id } = req.params;
    const { foodName, servingQty, servingUnit, servingWeightGrams, calories, protein, fat, carbs, cholesterol, sodium, sugars, potassium, photo } = req.body;
  
    // Check if all required fields are provided
    // if (!foodName || servingQty === undefined || !servingUnit || servingWeightGrams === undefined || calories === undefined || protein === undefined || fat === undefined || carbs === undefined || cholesterol === undefined || sodium === undefined || potassium === undefined || !photo) {
    //   return res.status(400).json({ error: 'All nutritional values are required.' });
    // }
  
    try {
      // Find and update the food log entry
      const updatedFoodLog = await IntakeStat.findOneAndUpdate(
        { _id: id }, // Ensure the log belongs to the authenticated user
        { foodName, servingQty, servingUnit, servingWeightGrams, calories, protein, fat, carbs, cholesterol, sodium, sugars, potassium, photo },
        { new: true } // Return the updated document
      );
  
      if (!updatedFoodLog) {
        return res.status(404).json({ message: 'Food log not found or not authorized.' });
      }
  
      res.json(updatedFoodLog);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  
  
  // Delete a food log entry
  router.delete('/log/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const foodLog = await IntakeStat.findOneAndDelete({ _id: id});
  
      if (!foodLog) {
        return res.status(404).json({ message: 'Food log not found' });
      }
  
      res.json({ message: 'Food log deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  export default router