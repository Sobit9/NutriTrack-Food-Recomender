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
import BreakdownChart from "./modules/BreakdownChart";
import Landingpage from "./components/landingpage";
import Login from "./components/Loginpage/login";
import Register from "./components/Registerpage/register";
import Calculate from "./components/Calculate/calculate";
import AboutUs from "./components/AboutUs";
import PrivateRoute from "./components/PrivateRoute";
import ProtectedComponent from "./components/ProtectedComponent";
import { AuthProvider } from "./components/Loginpage/authProvider";
function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Landingpage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/calculate" element={<Calculate />} />
              <Route path="/about" element={<AboutUs />} />

              <Route element={<Layout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/food" element={<Food />} />
                <Route path="/foodLog" element={<FoodLog />} />
                <Route path="/achievement" element={<Achievements />} />
                <Route path="/overview" element={<Overview />} />
                <Route path="/daily" element={<Daily />} />
                <Route path="/monthly" element={<Monthly />} />
                <Route path="/breakdown" element={<BreakdownChart />} />
              </Route>
            </Routes>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
