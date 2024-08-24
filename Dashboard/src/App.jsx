import { useMemo, useState } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { themeSettings } from "./theme";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Dashboard from "./components/dashoard";
import Layout from "./components/layout";
import Food from "./components/food";
import FoodLog from "./components/foodLog";
import Achievements from "./components/achievements";
import Overview from "./components/Overview";
import Daily from "./components/daily";
import Monthly from "./components/monthly";
import Breakdown from "./components/breakdown";
import Landingpage from "./components/landingpage";
import Login from "./components/Loginpage/login";
import Register from "./components/Registerpage/register";
import Calculate from "./components/Calculate/calculate";
import Foodrecomender from "./components/foodrecomender";
import Profile from "./components/profile";
import Edit from "./components/edit";
// import AboutUs from "./components/AboutUs";
// import PrivateRoute from "./components/PrivateRoute";
// import ProtectedComponent from "./components/ProtectedComponent";

import Admin from "./components/admin";
import About from "./components/About/about";
function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />

            <Routes>
              <Route path="/" element={<Landingpage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/calculate" element={<Calculate />} />
              {/* <Route path="/about" element={<AboutUs />} /> */}
              <Route path="/admin" element={<Admin />} />
              <Route path="/about" element={<About/>} />
              <Route element={<Layout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/food" element={<Food />} />
                <Route path="/foodLog" element={<FoodLog />} />
                <Route path="/foodrecommender" element={<Foodrecomender />} />
                <Route path="/overview" element={<Overview />} />
                <Route path="/daily" element={<Daily />} />
                <Route path="/monthly" element={<Monthly />} />
                <Route path="/breakdown" element={<Breakdown />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/edit" element={<Edit/>} />
                
              </Route>
            </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
