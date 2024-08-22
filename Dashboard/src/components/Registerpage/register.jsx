import React from "react";
import Navbar from "../Navbar";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
const Signup = () => {
  const gcheck1 = useRef(null);
  const gcheck2 = useRef(null);
  const regform1 = useRef(null);
  const regform2 = useRef(null);
  const hcheck1 = useRef(null);
  const hcheck2 = useRef(null);
  const hcheck3 = useRef(null);
  const icheck1 = useRef(null);
  const icheck2 = useRef(null);
  const icheck3 = useRef(null);
  const icheck4 = useRef(null);
  const jcheck1 = useRef(null);
  const jcheck2 = useRef(null);
  const jcheck3 = useRef(null);
  const jcheck4 = useRef(null);
  const jcheck5 = useRef(null);
  const kcheck1 = useRef(null);
  const kcheck2 = useRef(null);

  const icheck = [icheck1, icheck2, icheck3, icheck4];
  const jcheck = [jcheck1, jcheck2, jcheck3, jcheck4, jcheck5];
  const kcheck = [kcheck1, kcheck2];
  const [healthissues, sethealthissue] = useState(null);

  const [uname, setuname] = useState(null);
  const handleuname = (event) => {
    setuname(event.target.value);
  };

  const [email, setemail] = useState(null);
  const handleemail = (event) => {
    setemail(event.target.value);
  };

  const [password, setpassword] = useState(null);
  const handlepwd = (event) => {
    setpassword(event.target.value);
  };
  const [cpassword, setcpassword] = useState(null);
  const handlecpwd = (event) => {
    setcpassword(event.target.value);
  };
  const [gender, setgender] = useState(null);

  const [height, setheight] = useState(null);

  const handleht = (event) => {
    setheight(event.target.value);
  };

  const [weight, setweight] = useState(null);
  const handlewt = (event) => {
    setweight(event.target.value);
  };

  const [age, setage] = useState(null);
  const handleage = (event) => {
    setage(event.target.value);
  };

  const [activitylvl, setactivitylvl] = useState(null);
  const [ugoal, setugoal] = useState(null);
  const [upreference, setupref] = useState(null);

  const changegcolor = (a) => {
    if (a == 0) {
      gcheck1.current.classList.add("gchecked");
      gcheck2.current.classList.remove("gchecked");
      setgender("male");
    }
    if (a == 1) {
      gcheck2.current.classList.add("gchecked");
      gcheck1.current.classList.remove("gchecked");
      setgender("female");
    }
  };

  const changegcolor2 = (a) => {
    if (a == 0) {
      hcheck1.current.classList.add("gchecked");
      hcheck2.current.classList.remove("gchecked");
      hcheck3.current.classList.remove("gchecked");
      setugoal("lose weight");
    }
    if (a == 1) {
      hcheck2.current.classList.add("gchecked");
      hcheck1.current.classList.remove("gchecked");
      hcheck3.current.classList.remove("gchecked");
      setugoal("gain weight");
    }
    if (a == 2) {
      hcheck3.current.classList.add("gchecked");
      hcheck1.current.classList.remove("gchecked");
      hcheck2.current.classList.remove("gchecked");
      setugoal("maintain weight");
    }
  };

  const changegcolor3 = (a) => {
    if (a == 0) {
      icheck1.current.classList.add("gchecked");
      icheck4.current.classList.remove("gchecked");
      sethealthissue("diabities");
    } else if (a == 1) {
      icheck2.current.classList.add("gchecked");
      icheck3.current.classList.remove("gchecked");
      icheck4.current.classList.remove("gchecked");
      sethealthissue("lowbp");
    } else if (a == 2) {
      icheck3.current.classList.add("gchecked");
      icheck2.current.classList.remove("gchecked");
      icheck4.current.classList.remove("gchecked");
      sethealthissue("highbp");
    }
    if (a == 3) {
      icheck4.current.classList.add("gchecked");
      icheck1.current.classList.remove("gchecked");
      icheck2.current.classList.remove("gchecked");
      icheck3.current.classList.remove("gchecked");
      sethealthissue("none");
    }
    if (
      icheck1.current.classList.contains("gchecked") &&
      icheck2.current.classList.contains("gchecked")
    ) {
      sethealthissue("diabities lowbp");
    }
    if (
      icheck1.current.classList.contains("gchecked") &&
      icheck3.current.classList.contains("gchecked")
    ) {
      sethealthissue("diabities highbp");
    }
  };

  const changegcolor4 = (a) => {
    jcheck.forEach((ref, index) => {
      if (index == a) {
        ref.current.classList.add("gchecked");
      } else {
        ref.current.classList.remove("gchecked");
      }
    });
    if (a == 0) {
      setactivitylvl("sedentary");
    }
    if (a == 1) {
      setactivitylvl("lightly active");
    }
    if (a == 2) {
      setactivitylvl("moderately active");
    }
    if (a == 3) {
      setactivitylvl("very active");
    }
    if (a == 4) {
      setactivitylvl("extremely active");
    }
  };

  const changegcolor5 = (a) => {
    kcheck.forEach((ref, index) => {
      if (index == a) {
        ref.current.classList.add("gchecked");
      } else {
        ref.current.classList.remove("gchecked");
      }
    });
    if (a == 0) {
      setupref("veg");
    }
    if (a == 1) {
      setupref("nonveg");
    }
  };

  const data = {
    uname: uname,
    email: email,
    password: password,
    cpassword: cpassword,
    gender: gender,
    height: height,
    weight: weight,
    age: age,
    healthissues: healthissues,
    activitylvl: activitylvl,
    ugoal: ugoal,
    upreference: upreference,
  };

  const changepage = (a) => {
    if (a == 0) {
      regform1.current.classList.add("signblock");
      regform2.current.classList.remove("signblock");
    } else if (a == 1) {
      regform2.current.classList.add("signblock");
      regform1.current.classList.remove("signblock");
    } else if (a == 2) {
      console.log(data);
    }
  };

  return (
    <>
      <Navbar />
      <div className="Loginsignup">
        <div ref={regform1} className="loginform ">
          <div className="regbackbtn">
            <Link to="/">
              <button className="signupbtn">Go Back</button>
            </Link>
          </div>
          <div className="signup1" style={{ paddingTop: "90px" }}>
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
              <label>Email:</label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleemail}
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
            <div className="signup11">
              <label>Confirm Password:</label>
              <input
                type="password"
                placeholder="Confirm Password"
                value={cpassword}
                onChange={handlecpwd}
              />
            </div>
            <div className="gendercheck">
              <label>Gender:</label>
              <div className="genderr">
                <div
                  ref={gcheck1}
                  className="genderchoose"
                  onClick={() => changegcolor(0)}
                >
                  Male
                </div>
                <div
                  ref={gcheck2}
                  className="genderchoose"
                  onClick={() => changegcolor(1)}
                >
                  Female
                </div>
              </div>
            </div>
          </div>
          <div className="signup1" style={{ paddingTop: "90px" }}>
            <div className="signup11">
              <label>Age:</label>
              <input
                type="number"
                placeholder="18"
                value={age}
                onChange={handleage}
              ></input>
            </div>

            <div className="signup11">
              <label>Height(cm):</label>
              <input
                type="number"
                placeholder="170"
                value={height}
                onChange={handleht}
              ></input>
            </div>

            <div className="signup11">
              <label>Weight(kg):</label>
              <input
                type="number"
                placeholder="65"
                value={weight}
                onChange={handlewt}
              ></input>
            </div>

            <div className="reasoncheck">
              <label>Select Your Goal:</label>
              <div
                ref={hcheck1}
                className="goalcheck"
                onClick={() => changegcolor2(0)}
              >
                Loose Weight
              </div>
              <div
                ref={hcheck2}
                className="goalcheck"
                onClick={() => changegcolor2(1)}
              >
                Gain Weight
              </div>
              <div
                ref={hcheck3}
                className="goalcheck"
                onClick={() => changegcolor2(2)}
              >
                Maintain Weight
              </div>
            </div>
          </div>
          <div className="signupbtnfront">
            <button className="signupbtn" onClick={() => changepage(0)}>
              Next
            </button>
          </div>
        </div>
        <div ref={regform2} className="loginform signblock">
          <div className="healthissues">
            <label>Select Health Issues:</label>
            <div className="hselect">
              <div
                ref={icheck1}
                className="hissues"
                onClick={() => changegcolor3(0)}
              >
                Diabities
              </div>
              <div
                ref={icheck2}
                className="hissues"
                onClick={() => changegcolor3(1)}
              >
                Low BP
              </div>
            </div>
            <div className="hselect">
              <div
                ref={icheck3}
                className="hissues"
                onClick={() => changegcolor3(2)}
              >
                High BP
              </div>
              <div
                ref={icheck4}
                className="hissues"
                onClick={() => changegcolor3(3)}
              >
                None
              </div>
            </div>
          </div>
          <div className="healthissues">
            <label>Activity Level:</label>
            <div className="hselect1">
              <div
                ref={jcheck1}
                className="hissues1"
                key={0}
                onClick={() => changegcolor4(0)}
              >
                Sedentary
              </div>
              <div
                ref={jcheck2}
                className="hissues1"
                key={1}
                onClick={() => changegcolor4(1)}
              >
                Lightly Active
              </div>
              <div
                ref={jcheck3}
                className="hissues1"
                key={2}
                onClick={() => changegcolor4(2)}
              >
                Moderately Active
              </div>
              <div
                ref={jcheck4}
                className="hissues1"
                key={3}
                onClick={() => changegcolor4(3)}
              >
                Very Active
              </div>
              <div
                ref={jcheck5}
                className="hissues1"
                key={4}
                onClick={() => changegcolor4(4)}
              >
                Extremely Active
              </div>
            </div>
          </div>
          <div className="healthissues">
            <label>Food Preference:</label>
            <div className="hselect1">
              <div
                ref={kcheck1}
                className="hissues1"
                key={0}
                onClick={() => changegcolor5(0)}
              >
                VEG
              </div>
              <div
                ref={kcheck2}
                className="hissues1"
                key={1}
                onClick={() => changegcolor5(1)}
              >
                NON VEG
              </div>
            </div>
          </div>

          <div className="signupbtnback">
            <button className="signupbtn" onClick={() => changepage(1)}>
              Prev
            </button>
            <button className="signupbtn" onClick={() => changepage(2)}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
