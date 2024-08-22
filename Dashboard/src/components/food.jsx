import React, { useState, useEffect } from 'react';
import SearchBar from '../modules/SearchBar.jsx';
import FoodDialog from '../modules/FoodDialog.jsx';
import axios from '../api.jsx';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Header from "../modules/Header.jsx";

// const Food = ({
//   weight,
//   name,
//   calories,
//   protein,
//   carbs,
//   fats,
//   vitamins,
//   minerals,
//   category,
// }) => {
//   const theme = useTheme();
//   const [isExpanded, setIsExpanded] = useState(false);

//   return (
//     <Card
//       sx={{
//         backgroundImage: "none",
//         backgroundColor: theme.palette.background.alt,
//         borderRadius: "0.55rem",
//       }}
//     >
//       <CardContent>
//         <Typography
//           sx={{ fontSize: 14 }}
//           color={theme.palette.secondary[700]}
//           gutterBottom
//         >
//           {category}
//         </Typography>
//         <Typography variant="h5" component="div">
//           {name}
//         </Typography>
//         <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
//           Calorie Content {Number(calories).toFixed(2)}gm
//         </Typography>
//         <Typography>weight: {weight} gm</Typography>
//       </CardContent>
//       <CardActions>
//         <Button
//           variant="primary"
//           size="small"
//           onClick={() => setIsExpanded(!isExpanded)}
//         >
//           See More
//         </Button>
//       </CardActions>
//       <Collapse
//         in={isExpanded}
//         timeout="auto"
//         unmountOnExit
//         sx={{
//           color: theme.palette.neutral[300],
//         }}
//       >
//         <CardContent>
//           <Typography>Protein: {protein} gm</Typography>
//           <Typography>carbs: {carbs} gm</Typography>
//           <Typography>Fats: {fats} gm</Typography>
//           <Typography>Vitamins: {vitamins}</Typography>
//           <Typography>Minerals: {minerals}</Typography>
//         </CardContent>
//       </Collapse>
//     </Card>
//   );
// };
export default function food() {
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const [loggedFoods, setLoggedFoods] = useState([]);
  const [error, setError] = useState(null);
  const [selectedFood, setSelectedFood] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState('add'); // add or edit

  useEffect(() => {
    const fetchLoggedFoods = async () => {
      try {
        const response = await axios.get('/foodLog/logs');
        setLoggedFoods(response.data);
      } catch (error) {
        console.error('Error fetching logged foods:', error);
      }
    };

    fetchLoggedFoods();
  }, []);

  const handleLogFood = async (food) => {
    try {
      if (dialogMode === 'edit') {
        await axios.put(`/foodLog/log/${food._id}`, food);
        setLoggedFoods((prev) =>
          prev.map((item) => (item._id === food._id ? food : item))
        );
      } else {
        const response = await axios.post('/foodLog/log', food);
        setLoggedFoods((prev) => [...prev, response.data]);
      }
    } catch (error) {
      console.error('Error logging food:', error);
      setError('Failed to log food. Please try again.');
    }
  };

  const handleEditClick = (food) => {
    setSelectedFood(food);
    setDialogMode('edit');
    setIsDialogOpen(true);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you sure you want to delete this food log?')) {
      try {
        await axios.delete(`/foodLog/log/${id}`);
        setLoggedFoods((prev) => prev.filter((item) => item._id !== id));
      } catch (error) {
        console.error('Error deleting food log:', error);
        setError('Failed to delete food. Please try again.');
      }
    }
  };

  const openDialog = (food) => {
    setSelectedFood(food);
    setDialogMode('add');
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedFood(null); // Clear selected food when closing the dialog
  };
  return (
    <div className='text-black'>
    <Box m="1.5rem 2.5rem">
      <Header subtitle="Search for food here." />
      <SearchBar  onLogFood={openDialog} />
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
{error && <p style={{ color: 'red' }}>{error}</p>}
      {loggedFoods.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Photo</th>
              <th>Food Name</th>
              <th>Serving Quantity</th>
              <th>Serving Unit</th>
              <th>Serving Weight (grams)</th>
              <th>Actions</th> {/* New column for actions */}
            </tr>
          </thead>
          <tbody>
            {loggedFoods.map((food) => (
              <tr key={food._id}>
                <td>
                  <img src={food.photo} alt={food.foodName} width="50" height="50" />
                </td>
                <td>{food.foodName}</td>
                <td>{food.servingQty}</td>
                <td>{food.servingUnit}</td>
                <td>{food.servingWeightGrams}</td>
                <td>
                  <button onClick={() => handleEditClick(food)}>Edit</button>
                  <button onClick={() => handleDeleteClick(food._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {isDialogOpen && selectedFood && (
        <FoodDialog
          food={selectedFood}
          onClose={closeDialog}
          onLogFood={handleLogFood}
          mode={dialogMode} // Pass mode to FoodDialog
        />
      )}
        </Box> 
    </Box>
    </div>
  );
}
