import React, { useState } from 'react';
import axios from 'axios';
import FoodDialog from './FoodDialog';

const SearchBar = ({ onLogFood }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSearch = async (e) => {
    setQuery(e.target.value);
    if (e.target.value.length > 2) {
      try {
        const response = await axios.get(`http://localhost:5000/food/search/${e.target.value}`);
        setResults(response.data.common); // Adjust based on your response structure
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    } else {
      setResults([]);
    }
  };

  const handleSelectFood = async (food) => {
    try {
      const response = await axios.get(`http://localhost:5000/food/item/${food.food_name}`);
      const detailedFood = {
        ...response.data,
        foodName: food.food_name,
        servingQty: food.serving_qty,
        servingUnit: food.serving_unit,
        photo: food.photo.thumb || 'https://via.placeholder.com/50',
      };
      setSelectedFood(detailedFood);
      setDialogOpen(true);
    } catch (error) {
      console.error('Error fetching food details:', error);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setQuery('');
    setResults([]);
  };

  const handleLogFood = (food) => {
    onLogFood(food);
    handleDialogClose();
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for food..."
        value={query}
        onChange={handleSearch}
        style={{ width: '300px', padding: '10px', marginBottom: '10px' }}
      />
      {results.length > 0 && (
        <ul
          style={{
            listStyleType: 'none',
            padding: '0',
            maxHeight: '200px',
            overflowY: 'auto',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        >
          {results.map((item) => (
            <li
              key={item.tag_id}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
                borderBottom: '1px solid #ccc',
                cursor: 'pointer',
              }}
              onClick={() => handleSelectFood(item)}
            >
              <img
                src={item.photo.thumb || 'https://via.placeholder.com/50'}
                alt={item.food_name}
                style={{
                  width: '50px',
                  height: '50px',
                  objectFit: 'cover',
                  marginRight: '10px',
                }}
              />
              {item.food_name}
            </li>
          ))}
        </ul>
      )}
      {dialogOpen && (
        <FoodDialog
          food={selectedFood}
          onClose={handleDialogClose}
          onLogFood={handleLogFood}
        />
      )}
    </div>
  );
};

export default SearchBar