import React from "react";
import Navbar from "../Navbar";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
const Login = () => {
  const [uname, setuname] = useState(null);
  const handleuname = (event) => {
    setuname(event.target.value);
  };

  const [password, setpassword] = useState(null);
  const handlepwd = (event) => {
    setpassword(event.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="Loginsignup">
        <form className="loginform ">
          <div className="regbackbtn">
            <Link to="/">
              <button className="signupbtn">Go Back</button>
            </Link>
          </div>

          <div className="signup1" style={{ justifyContent: "center" }}>
            <div className="signup11">
              <label>Username:</label>
              <input
                type="text"
                placeholder="Username"
                value={uname}
                onChange={handleuname}
              />
            </div>
            <div className="signup11">
              <label>Password:</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlepwd}
              />
            </div>
          </div>
          <div className="signupbtnfront">
            <Link to={"/dashboard"}>
              <button className="signupbtn">Login</button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
