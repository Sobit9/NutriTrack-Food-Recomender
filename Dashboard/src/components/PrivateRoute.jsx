// PrivateRoute.js
import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./Loginpage/authProvider.jsx"; // Adjust the path if necessary

const PrivateRoute = ({ element, ...rest }) => {
  const { auth } = useAuth();

  return auth ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
