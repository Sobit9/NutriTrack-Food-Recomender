import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [sessionData, setSessionData] = useState(null);

  useEffect(() => {
    // Retrieve session data from sessionStorage
    const data = sessionStorage.getItem('sessionData');
    if (data) {
        // Parse the data if it's a JSON string
        setSessionData(JSON.parse(data));
      }
    }, []);
    const {
        name,
        username,
        email,
        age,
        gender,
        height,
        weight,
        activityLevel,
        dietaryPreferences,
        bmi,
        healthIssues,
        calorieLimit,
        carbLimit,
        proteinLimit,
        bmr,
        role,
      } = sessionData || {};
    

  return (
    <Box display="flex">
     <h2>Profile Page</h2>
      {sessionData ? (
        <Box 
        mt="20px"
        alignItems="center"
        display="flex-direction-column"
        gridTemplateRows="repeat(12, 1fr)"
        gridAutoColumns="160px"
        // gap="20px"
        >
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Username:</strong> {username}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Age:</strong> {age}</p>
          <p><strong>Gender:</strong> {gender}</p>
          <p><strong>Height:</strong> {height} cm</p>
          <p><strong>Weight:</strong> {weight} kg</p>
          <p><strong>Activity Level:</strong> {activityLevel}</p>
          <p><strong>Dietary Preferences:</strong> {dietaryPreferences}</p>
          <p><strong>BMI:</strong> {bmi}</p>
          <p><strong>Health Issues:</strong> {healthIssues}</p>
          <p><strong>Calorie Limit:</strong> {calorieLimit}</p>
          <p><strong>Carb Limit:</strong> {carbLimit}</p>
          <p><strong>Protein Limit:</strong> {proteinLimit}</p>
          <p><strong>BMR:</strong> {bmr}</p>
          <p><strong>Role:</strong> {role}</p>
        </Box>
      ) : (
        <p>No data found in sessionStorage.</p>
      )}

      <Link className='justify-center' to="/edit">Edit Profile</Link>
    </Box>
  );
};

export default Profile;
