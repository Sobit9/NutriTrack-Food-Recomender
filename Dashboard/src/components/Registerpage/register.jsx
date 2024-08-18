import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import Header from "./../../modules/Header";
import Navbar from "./../Navbar";

const Register = () => {
  const theme = useTheme();
  // const [file, setFile] = useState()
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    phoneNumber: "",
    activityLevel: "",
    dietaryPreferences: "none",
    healthIssues: [],
    role: "user",
    avatar: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, avatar: e.target.files[0] });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevState) => {
      const healthIssues = prevState.healthIssues || []; // Ensure healthIssues is an array
      if (checked) {
        return { ...prevState, healthIssues: [...healthIssues, value] };
      } else {
        return {
          ...prevState,
          healthIssues: healthIssues.filter((issue) => issue !== value),
        };
      }
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        body: data,
      });

      if (response.status === 201) {
        navigate("/login"); // Navigate to the login page upon successful registration
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // const [message, setMessage] = useState("");
  // const navigate = useNavigate();
  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios.post("http://localhost:3000/register", formData);
  //     setMessage("Registration successful! Redirecting to the landing page...");
  //     setTimeout(() => {
  //       navigate("/"); // Redirect to landing page after successful registration
  //     }, 1000); // 2-second delay to show the message
  //   } catch (error) {
  //     setMessage(
  //       `Registration failed: ${error.response?.data?.error || "An error occurred."}`
  //     );
  //   }
  // };
  return (
    // <div className="min-h-screen flex items-center justify-center">
    <Box m="sticky top-0 z-10 flex items-center justify-evenly">
      <Navbar />
      <div className="justify-between m-5">
        <Header
          title="RegistrationForm"
          subtitle="Please Register your Account."
        />
      </div>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="grid grid-cols-3 justify-center">
          <Box className="grid justify-center gap-[20px] text-lg">
            <Box
              gridColumn="span 8"
              gridRow="span 2"
              backgroundColor={theme.palette.background.alt}
              px="1rem"
              borderRadius="0.55rem"
            >
              <label className="text-yellow-500">Avatar:</label>
              <input
                type="file"
                name="avatar"
                onChange={handleFileChange}
                className="block text-gray-900 font-bold mb-2"
                placeholder="Upload your image."
              />
            </Box>
            <Box
              gridColumn="span 8"
              gridRow="span 2"
              backgroundColor={theme.palette.background.alt}
              px="1rem"
              borderRadius="0.55rem"
            >
              <label className="text-yellow-500">Username:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="block text-gray-900 font-bold mb-2"
              />
            </Box>
            <Box
              gridColumn="span 8"
              gridRow="span 2"
              backgroundColor={theme.palette.background.alt}
              px="1rem"
              borderRadius="0.55rem"
            >
              <label className="text-yellow-500">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="block text-gray-900 font-bold mb-2"
                required
              />
            </Box>
            <Box
              gridColumn="span 8"
              gridRow="span 2"
              backgroundColor={theme.palette.background.alt}
              px="1rem"
              borderRadius="0.55rem"
            >
              <label className="text-yellow-500">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="block text-gray-900 font-bold mb-2"
              />
            </Box>
            <Box
              gridColumn="span 8"
              gridRow="span 2"
              backgroundColor={theme.palette.background.alt}
              px="1rem"
              borderRadius="0.55rem"
            >
              <label className="text-yellow-500">Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="block text-gray-900 font-bold mb-2"
                required
              />
            </Box>
          </Box>
          <Box className="grid justify-center gap-[20px] text-lg">
            <Box
              gridColumn="span 8"
              gridRow="span 2"
              backgroundColor={theme.palette.background.alt}
              px="1rem"
              borderRadius="0.55rem"
            >
              <label className="text-yellow-500">Phone Number:</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="block text-gray-900 font-bold mb-2"
              />
            </Box>
            <Box
              gridColumn="span 8"
              gridRow="span 2"
              backgroundColor={theme.palette.background.alt}
              px="1rem"
              borderRadius="0.55rem"
            >
              <label className="text-yellow-500">Age:</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                className="block text-gray-900 font-bold mb-2"
              />
            </Box>
            <Box
              gridColumn="span 8"
              gridRow="span 2"
              backgroundColor={theme.palette.background.alt}
              px="1rem"
              borderRadius="0.55rem"
            >
              <label className="text-yellow-500">Weight (kg):</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                required
                className="block text-gray-900 font-bold mb-2"
              />
            </Box>
            <Box
              gridColumn="span 8"
              gridRow="span 2"
              backgroundColor={theme.palette.background.alt}
              px="1rem"
              borderRadius="0.55rem"
            >
              <label className="text-yellow-500">Gender:</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="block text-gray-900 font-bold mb-2"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </Box>
            <Box
              gridColumn="span 8"
              gridRow="span 2"
              backgroundColor={theme.palette.background.alt}
              px="1rem"
              borderRadius="0.55rem"
            >
              <label className="text-yellow-500">Height (cm):</label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                required
                className="block text-gray-900 font-bold mb-2"
              />
            </Box>
          </Box>
          <Box className="grid justify-center gap-[20px] text-lg">
            <Box
              gridColumn="span 8"
              gridRow="span 2"
              backgroundColor={theme.palette.background.alt}
              px="1rem"
              borderRadius="0.55rem"
            >
              <label className="text-yellow-500">Activity Level:</label>
              <select
                name="activityLevel"
                value={formData.activityLevel}
                onChange={handleChange}
                required
                className="block text-gray-900 font-bold mb-2"
              >
                <option value="">Select</option>
                <option value="sedentary">Sedentary</option>
                <option value="lightly active">Lightly Active</option>
                <option value="moderately active">Moderately Active</option>
                <option value="very active">Very Active</option>
                <option value="extremely active">Extremely Active</option>
              </select>
            </Box>
            <Box
              gridColumn="span 8"
              gridRow="span 2"
              backgroundColor={theme.palette.background.alt}
              px="1rem"
              borderRadius="0.55rem"
            >
              <label className="text-yellow-500">Dietary Preferences:</label>
              <select
                name="dietaryPreferences"
                value={formData.dietaryPreferences}
                onChange={handleChange}
                required
                className="block text-gray-900 font-bold mb-2"
              >
                <option value="none">None</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="gluten-free">Gluten-Free</option>
                <option value="dairy-free">Dairy-Free</option>
              </select>
            </Box>
            <Box
              gridColumn="span 8"
              gridRow="span 2"
              backgroundColor={theme.palette.background.alt}
              px="1rem"
              borderRadius="0.55rem"
            >
              <label className="text-yellow-500">Health Issues:</label>
              <Box
                gridColumn="span 8"
                gridRow="span 2"
                backgroundColor={theme.palette.background.alt}
                px="1rem"
                borderRadius="0.55rem"
              >
                <label className="text-yellow-500">
                  <input
                    type="checkbox"
                    name="healthIssues"
                    value="Diabetes"
                    onChange={handleCheckboxChange}
                    className="block text-gray-900 font-bold mb-2"
                  />
                  Diabetes
                </label>
                <label className="text-yellow-500">
                  <input
                    type="checkbox"
                    name="healthIssues"
                    value="Low BP"
                    onChange={handleCheckboxChange}
                    className="block text-gray-900 font-bold mb-2"
                  />
                  Low BP
                </label>
                <label className="text-yellow-500">
                  <input
                    type="checkbox"
                    name="healthIssues"
                    value="High BP"
                    onChange={handleCheckboxChange}
                    className="block text-gray-900 font-bold mb-2"
                  />
                  High BP
                </label>
                <label className="text-yellow-500">
                  <input
                    type="checkbox"
                    name="healthIssues"
                    value="Iron Deficiency"
                    onChange={handleCheckboxChange}
                    className="block text-gray-900 font-bold mb-2"
                  />
                  Iron Deficiency
                </label>
              </Box>
            </Box>
          </Box>
        </div>
        <div className="flex  justify-center text-lg">
          <button
            className="text-yellow-500 rounded-full m-6 py-2 px-5 bg-green-200 hover:text-red-600 transition"
            type="submit"
            // className="w-80 bg-yellow-600 text-white p-2 rounded hover:bg-yellow-800 transition"
          >
            Register
          </button>
          <Link
            className="text-yellow-500 rounded-full m-6 py-2 px-5 bg-green-200 hover:text-red-600 transition"
            to="/"
          >
            Go Back
          </Link>
        </div>
      </form>
    </Box>
  );
};

export default Register;
