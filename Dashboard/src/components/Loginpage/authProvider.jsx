// import React, { createContext, useState, useContext, useEffect } from "react";
// import axios from "axios";
// import api from "../../api"
// // const AuthContext = createContext();

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [auth, setAuth] = useState(null);
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       api.get('/auth/me').then(response => {
//         setUser(response.data);
//         setLoading(false);
//       }).catch(() => {
//         localStorage.removeItem('token');
//         setLoading(false);
//       });
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   const login = async (email, password) => {
//     try {
//       const response = await axios.post("http://localhost:3000/login", {
//         email,
//         password,
//       });
//       setAuth(response.data);
//       return true; // Indicate success
//     } catch (error) {
//       console.error("Login failed", error);
//       return false; // Indicate failure
//     }
//   };
//   const logout = () => {
//     localStorage.removeItem('token');
//     setAuth(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import React, { createContext, useContext, useState } from 'react';
import axios from "axios";
const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      }).then(response => {
        localStorage.setItem('token', response.data.token);
      })
      ;
      // setUser(response.data);
      return true; // Indicate success
    } catch (error) {
      console.error("Login failed", error);
      return false; // Indicate failure
    }
  };

  const logout = () => {
  setUser(null);
  }
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
