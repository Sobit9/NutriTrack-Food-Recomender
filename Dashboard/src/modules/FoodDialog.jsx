import React, { useState, useEffect } from 'react';

const FoodDialog = ({ food, onClose, onLogFood, mode }) => {
  const [servingQty, setServingQty] = useState('');
  const [servingWeight, setServingWeight] = useState('');
  const [nutritionalInfo, setNutritionalInfo] = useState({
    calories: '',
    protein: '',
    fat: '',
    carbs: '',
    cholesterol: '',
    sodium: '',
    sugars: '',
    potassium: '',
  });

  useEffect(() => {
    if (food) {
      setServingQty(food.servingQty);
      setServingWeight(food.servingWeightGrams);
      setNutritionalInfo({
        calories: food.calories,
        protein: food.protein,
        fat: food.fat,
        carbs: food.carbs,
        cholesterol: food.cholesterol,
        sodium: food.sodium,
        sugars: food.sugars,
        potassium: food.potassium,
      });
    }
  }, [food]);

  const handleServingQtyChange = (e) => {
    const newQty = e.target.value;
    setServingQty(newQty);
    if (food.servingQty && newQty > 0) {
      const factor = newQty / food.servingQty;
      updateNutritionalInfo(factor);
    }
  };

  const handleServingWeightChange = (e) => {
    const newWeight = e.target.value;
    setServingWeight(newWeight);
    if (food.servingWeightGrams && newWeight > 0) {
      const factor = newWeight / food.servingWeightGrams;
      updateNutritionalInfo(factor);
    }
  };

  const updateNutritionalInfo = (factor) => {
    setNutritionalInfo({
      calories: (food.calories * factor).toFixed(2),
      protein: (food.protein * factor).toFixed(2),
      fat: (food.fat * factor).toFixed(2),
      carbs: (food.carbs * factor).toFixed(2),
      cholesterol: (food.cholesterol * factor).toFixed(2),
      sodium: (food.sodium * factor).toFixed(2),
      sugars: (food.sugars * factor).toFixed(2),
      potassium: (food.potassium * factor).toFixed(2),
    });
  };

  const handleLogFood = async () => {
    if (servingQty > 0 && servingWeight > 0) {
      const loggedFood = {
        foodName: food.foodName,
        servingQty,
        servingUnit: food.servingUnit,
        servingWeightGrams: servingWeight,
        calories: nutritionalInfo.calories,
        protein: nutritionalInfo.protein,
        fat: nutritionalInfo.fat,
        carbs: nutritionalInfo.carbs,
        cholesterol: nutritionalInfo.cholesterol,
        sodium: nutritionalInfo.sodium,
        sugars: nutritionalInfo.sugars,
        potassium: nutritionalInfo.potassium,
        photo: food.photo,
      };

      try {
        await onLogFood({ ...loggedFood, _id: food._id }); // Pass the _id if editing
        onClose(); // Close the dialog after logging the food
      } catch (error) {
        alert('Failed to save food log.');
      }
    } else {
      alert('Please enter a valid serving quantity and serving weight.');
    }
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <h3>{food.foodName} {mode === 'edit' ? '(Edit)' : '(Add)'}</h3>
        <img src={food.photo} alt={food.foodName} />
        <div>
          <label>Serving Quantity:</label>
          <input
            type="number"
            value={servingQty}
            onChange={handleServingQtyChange}
            min="0"
          />
          <span>{food.servingUnit}</span>
        </div>
        <div>
          <label>Serving Weight (grams):</label>
          <input
            type="number"
            value={servingWeight}
            onChange={handleServingWeightChange}
            min="0"
          />
        </div>
        <div>
          <label>Calories: </label>{nutritionalInfo.calories}
        </div>
        <div>
          <label>Protein: </label>{nutritionalInfo.protein}g
        </div>
        <div>
          <label>Fat: </label>{nutritionalInfo.fat}g
        </div>
        <div>
          <label>Carbs: </label>{nutritionalInfo.carbs}g
        </div>
        <div>
          <label>Cholesterol: </label>{nutritionalInfo.cholesterol}mg
        </div>
        <div>
          <label>Sodium: </label>{nutritionalInfo.sodium}mg
        </div>
        <div>
          <label>Sugars: </label>{nutritionalInfo.sugars}g
        </div>
        <div>
          <label>Potassium: </label>{nutritionalInfo.potassium}mg
        </div>
        <div>
          <button onClick={handleLogFood}>{mode === 'edit' ? 'Update' : 'Add'} Food</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default FoodDialog;