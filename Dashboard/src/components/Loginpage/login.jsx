// import { Link, useNavigate } from "react-router-dom";
// import React, { useState } from "react";
// // import { useAuth } from "./authProvider";
// import Navbar from "./../Navbar";
// import axios from 'axios';
// const Login = () => {
//   const [credentials, setCredentials] = useState({ email: '', password: '' });
//   const navigate = useNavigate(); // Hook for navigation

//   const handleChange = (e) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:3000/login', credentials);
//       localStorage.setItem('token', response.data.token);
//       navigate('/food'); // Redirect using navigate
//     } catch (error) {
//       console.error('Error logging in:', error);
//     }
//   };
//   return (
//     <>
//       <Navbar />
//         <form className="loginform mx-16" onSubmit={handleSubmit}>
//           <div className="regbackbtn">
//             <Link to="/">
//               <button className="signupbtn">Go Back</button>
//             </Link>
//           </div>

//           <div className="signup1" style={{ justifyContent: "center" }}>
//             <div className="signup11">
//               <label>Email:</label>
//               <input
//                 className="text-black"
//                 type="text"
//                 name="email"
//                 placeholder="Email"
//                 value={credentials.email}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="signup11">
//               <label>Password:</label>
//               <input
//                 className="text-black"
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={credentials.password}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>
//           <div className="signupbtnfront">
//           <button type="submit" className="signupbtn">
//             Login
//           </button>
//         </div>
//         </form>
      
//     </>
//   );
// };

// export default Login;

import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Navbar from "./../Navbar";
import { useUser } from "./authProvider";
import axios from 'axios';

// const fetchMealData = async () => {
//   try {
//     const token = localStorage.getItem('authToken');
//     if (!token) throw new Error("No token found");

//     const response = await axios.get('http://localhost:3000/fetchmeal', {
//       headers: {
//         Authorization: `Bearer ${token}`
//       },
//       params: {
//         bmr: 2530,
//         ftype: 'nonveg',
//         diab: 0,
//         lbp: 1,
//         hbp: 0
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching meal data:", error);
//     throw error;
//   }
// }
  const Login = () => {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Hook for navigation
    const authContext = useUser();
    const { login } = authContext;

  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const success = await login(email, password);
        if (success) {
          const response = await axios.get(`http://localhost:3000/user?email=${email}`);
        const userData = response.data; 
        localStorage.setItem('userData', JSON.stringify(userData));
          sessionStorage.setItem('sessionData', JSON.stringify(userData));
          // fetchMealData
         // Save the user data in the context
          navigate('/dashboard'); // Redirect using navigate
        
      }}


  return (
    <>
      <Navbar />
      <form className="loginform mx-16" onSubmit={handleSubmit}>
        <div className="regbackbtn">
          <Link to="/">
            <button className="signupbtn">Go Back</button>
          </Link>
        </div>

        <div className="signup1" style={{ justifyContent: "center" }}>
          <div className="signup11">
            <label>Email:</label>
            <input
              className="text-black"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="signup11">
            <label>Password:</label>
            <input
              className="text-black"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="signupbtnfront">
          <button type="submit" className="signupbtn">
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
