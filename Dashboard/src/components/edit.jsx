import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function edit() {
    const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    activityLevel: '',
    dietaryPreferences: '',
    bmi: '',
    healthIssues: '',
    calorieLimit: '',
    carbLimit: '',
    proteinLimit: '',
    bmr: '',
    role: ''
  });

  useEffect(() => {
    // Fetch user data from localStorage or backend
    const fetchUserData = async () => {
      const data = JSON.parse(localStorage.getItem('userData'));
      if (data) {
        setUserData(data);
        setFormData({
          name: data.name,
          username: data.username,
          email: data.email,
          age: data.age,
          gender: data.gender,
          height: data.height,
          weight: data.weight,
          activityLevel: data.activityLevel,
          dietaryPreferences: data.dietaryPreferences.join(', '),
          bmi: data.bmi,
          healthIssues: data.healthIssues.join(', '),
          calorieLimit: data.calorieLimit,
          carbLimit: data.carbLimit,
          proteinLimit: data.proteinLimit,
          bmr: data.bmr,
          role: data.role
        });
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:3000/profile', formData);
      localStorage.setItem('userData', JSON.stringify(response.data));
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  return (
    <div className='flex flex-col'>
        <div >
      <h2>Edit Profile</h2>
      <form className='flex items-center flex-col' onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <label>Age:</label>
        <input
          type="text"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
        <label>Gender:</label>
        <input
          type="text"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        />
        <label>Height:</label>
        <input
          type="number"
          name="height"
          value={formData.height}
          onChange={handleChange}
        />
        <label>Weight:</label>
        <input
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
        />
        <label>Activity Level:</label>
        <input
          type="text"
          name="activityLevel"
          value={formData.activityLevel}
          onChange={handleChange}
        />
        <label>Dietary Preferences:</label>
        <input
          type="text"
          name="dietaryPreferences"
          value={formData.dietaryPreferences}
          onChange={handleChange}
        />
        <label>BMI:</label>
        <input
          type="number"
          name="bmi"
          value={formData.bmi}
          onChange={handleChange}
        />
        <label>Health Issues:</label>
        <input
          type="text"
          name="healthIssues"
          value={formData.healthIssues}
          onChange={handleChange}
        />
        <label>Calorie Limit:</label>
        <input
          type="number"
          name="calorieLimit"
          value={formData.calorieLimit}
          onChange={handleChange}
        />
        <label>Carb Limit:</label>
        <input
          type="number"
          name="carbLimit"
          value={formData.carbLimit}
          onChange={handleChange}
        />
        <label>Protein Limit:</label>
        <input
          type="number"
          name="proteinLimit"
          value={formData.proteinLimit}
          onChange={handleChange}
        />
        <label>BMR:</label>
        <input
          type="number"
          name="bmr"
          value={formData.bmr}
          onChange={handleChange}
        />
        <label>Role:</label>
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
        />
        <button className="border-amber-500 rounded-md bg-green-400 p-3 m-1" type="submit">Save Changes</button>
      </form>
    </div>
    </div>
  )
}
