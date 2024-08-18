import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useAuth } from "./authProvider";
import Navbar from "./../Navbar";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const authContext = useAuth();
  console.log("useAuth output:", authContext);

  const { login } = authContext;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate("/dashboard"); // Redirect to the dashboard
    }
  };

  return (
    <>
      <Navbar />
      <form className="loginform " onSubmit={handleSubmit}>
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
