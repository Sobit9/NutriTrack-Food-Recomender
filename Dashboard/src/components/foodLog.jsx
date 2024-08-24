// import React, { useEffect, useState }  from "react";


// import {
//   Box,
//   // Card,
//   // CardActions,
//   // CardContent,
//   // Collapse,
//   // Button,
//   // Typography,
//   // useTheme,
//   // useMediaQuery,
// } from "@mui/material";
// import Header from "../modules/Header.jsx";
// import axios from "axios"
// // import { useGetFoodLogsQuery } from "../state/api.jsx";
// // import Food from './../../../Server/models/foodData.js';

//  const foodLog = ({ userId }) => {
//   const [mealLogs, setMealLogs] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchMealLogs = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/foodLog/logs");
//         const data = response.data;

//         // Check if data is an array
//         if (Array.isArray(data)) {
//           setMealLogs(data);
//         } else {
//           console.error("Expected an array but got:", data);
//           setError("Unexpected data format");
//         }
//       } catch (error) {
//         console.error("Error fetching meal logs:", error);
//         setError("Failed to fetch meal logs.");
//       }
//     };

//     fetchMealLogs();
//   }, [userId]);

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <Box>
//       <h6>Meal Logs</h6>
//       {mealLogs.length > 0 ? (
//         <table className="m-5 w-full">
//           <thead>
//             <tr>
//               <th>FoodName</th>
//               <th>SerQuant</th>
//               <th>SerUnit</th>
//               <th>SerWeight(gm)</th>
//               <th>Calories</th>
//               <th>Protein</th>
//               <th>Fat</th>
//               <th>Carbs</th>
//               <th>Cholesterol</th>
//               <th>Sodium</th>
//               <th>Sugars</th>
//               <th>Potassium</th>
//               <th>Photo</th>
//             </tr>
//           </thead>
//           <tbody>
//             {mealLogs.map((log) => (
//               <tr key={log._id}>
//                 <td>{log.foodName}</td>
//                 <td>{log.servingQty}</td>
//                 <td>{log.servingUnit}</td>
//                 <td>{log.servingWeightGrams}</td>
//                 <td>{log.calories}</td>
//                 <td>{log.protein}</td>
//                 <td>{log.fat}</td>
//                 <td>{log.carbs}</td>
//                 <td>{log.cholesterol}</td>
//                 <td>{log.sodium}</td>
//                 <td>{log.sugars}</td>
//                 <td>{log.potassium}</td>
//                 <td>
//                   <img src={log.photo} alt={log.foodName} width="50" height="50" />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No meal logs found.</p>
//       )}
//     </Box>
//   );
// };
// export default foodLog


import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import Header from "../modules/Header.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const FoodLog = ({ userId }) => {
  const [mealLogs, setMealLogs] = useState([]);
  const [totals, setTotals] = useState({
    totalCalories: 0,
    totalProtein: 0,
    totalCarbs: 0,
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchMealLogs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/foodLog/logs");
        const data = response.data;

        // Check if data is an array
        if (Array.isArray(data)) {
          setMealLogs(data);

          // Calculate totals
          let totalCalories = 0;
          let totalProtein = 0;
          let totalCarbs = 0;

          data.forEach((log) => {
            totalCalories += log.calories;
            totalProtein += log.protein;
            totalCarbs += log.carbs;
          });

          setTotals({
            totalCalories,
            totalProtein,
            totalCarbs,
          });
        } else {
          console.error("Expected an array but got:", data);
          setError("Unexpected data format");
        }
      } catch (error) {
        console.error("Error fetching meal logs:", error);
        setError("Failed to fetch meal logs.");
      }
    };

    fetchMealLogs();
  }, [userId]);

  const handleNextPage = () => {

    navigate("/dashboard", { state: { totalCalories: totals.totalCalories } });
  };

  if (error) {
    return <p>{error}</p>;
  }
  

  return (
    <Box>
      <Header/>
      <h6>Meal Logs</h6>
      {mealLogs.length > 0 ? (
        <table className="m-5 w-full">
          <thead>
            <tr>
              <th>FoodName</th>
              <th>SerQuant</th>
              <th>SerUnit</th>
              <th>SerWeight(gm)</th>
              <th>Calories</th>
              <th>Protein</th>
              <th>Fat</th>
              <th>Carbs</th>
              <th>Cholesterol</th>
              <th>Sodium</th>
              <th>Sugars</th>
              <th>Potassium</th>
              <th>Photo</th>
            </tr>
          </thead>
          <tbody>
            {mealLogs.map((log) => (
              <tr key={log._id}>
                <td>{log.foodName}</td>
                <td>{log.servingQty}</td>
                <td>{log.servingUnit}</td>
                <td>{log.servingWeightGrams}</td>
                <td>{log.calories}</td>
                <td>{log.protein}</td>
                <td>{log.fat}</td>
                <td>{log.carbs}</td>
                <td>{log.cholesterol}</td>
                <td>{log.sodium}</td>
                <td>{log.sugars}</td>
                <td>{log.potassium}</td>
                <td>
                  <img
                    src={log.photo}
                    alt={log.foodName}
                    width="50"
                    height="50"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No meal logs found.</p>
      )}

<div className="text-xl flex flex-col justify-between align-middle">
      <h2>Total Nutrients</h2>
      <span>Total Calories: {totals.totalCalories.toFixed(2)}</span>
      <span>Total Protein: {totals.totalProtein.toFixed(2)}g</span>
      <span>Total Carbs: {totals.totalCarbs.toFixed(2)}g</span>
    </div>
    <Button variant="contained" color="primary" onClick={handleNextPage}>Pass TotalCal</Button>
    </Box>
  );
};

export default FoodLog;