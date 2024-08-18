import Navbar from "../Navbar";
import React from "react";
import { useRef, useState, useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { Link } from "react-router-dom";
const Calculate = () => {
  const closemodal1 = useRef(null);
  const closemodal2 = useRef(null);
  const gcheck1 = useRef(null);
  const gcheck2 = useRef(null);
  const jcheck1 = useRef(null);
  const jcheck2 = useRef(null);
  const jcheck3 = useRef(null);
  const jcheck4 = useRef(null);
  const jcheck5 = useRef(null);

  const jcheck = [jcheck1, jcheck2, jcheck3, jcheck4, jcheck5];

  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [submittedValue, setSubmittedValue] = useState("");
  const [age1, setage1] = useState("");
  const [height1, setheight1] = useState("");
  const [weight1, setweight1] = useState("");
  const [activitylvl1, setactivitylvl1] = useState("");
  const [gender1, setgender1] = useState("");
  const [submittedValue2, setSubmittedValue2] = useState("");

  const handleChange1 = (event) => {
    setInputValue1(event.target.value);
  };
  const handleChange2 = (event) => {
    setInputValue2(event.target.value);
  };

  const handleChangex1 = (event) => {
    setage1(event.target.value);
  };
  const handleChangex2 = (event) => {
    setheight1(event.target.value);
  };
  const handleChangex3 = (event) => {
    setweight1(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const inputValue11 = inputValue1 / 100;
    setSubmittedValue((inputValue2 / inputValue11 ** 2).toFixed(2));
  };

  const handleSubmit2 = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const bmr =
      (10 * weight1 + 6.25 * height1 - 5 * age1 - gender1) * activitylvl1;
    setSubmittedValue2(bmr);
  };

  const changegcolor = (a) => {
    if (a == 0) {
      gcheck1.current.classList.add("gchecked");
      gcheck2.current.classList.remove("gchecked");
      setgender1(-5);
    }
    if (a == 1) {
      gcheck2.current.classList.add("gchecked");
      gcheck1.current.classList.remove("gchecked");
      setgender1(161);
    }
  };
  const changegcolor4 = (a) => {
    jcheck.forEach((ref, index) => {
      if (index == a) {
        ref.current.classList.add("gchecked");
      } else {
        ref.current.classList.remove("gchecked");
      }
      if (a == 0) {
        setactivitylvl1(1.2);
      } else if (a == 1) {
        setactivitylvl1(1.375);
      } else if (a == 2) {
        setactivitylvl1(1.55);
      } else if (a == 3) {
        setactivitylvl1(1.725);
      } else if (a == 4) {
        setactivitylvl1(1.9);
      }
    });
  };

  const modalopen = (a) => {
    if (a == 0) {
      closemodal1.current.classList.remove("signblock");
      closemodal2.current.classList.add("signblock");
    } else if (a == 1) {
      closemodal2.current.classList.remove("signblock");
      closemodal1.current.classList.add("signblock");
    }
  };
  const modalclose = (a) => {
    if (a == 0) {
      closemodal1.current.classList.add("signblock");
    } else if (a == 1) {
      closemodal2.current.classList.add("signblock");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="loginform mx-40">
        <div className="regbackbtn">
          <Link to="/">
            <button className="signupbtn">Go Back</button>
          </Link>
        </div>

        <div className="signup1" style={{ justifyContent: "center" }}>
          <div className="calc1" onClick={() => modalopen(0)}>
            BMI
          </div>
        </div>
        <div className="signup1" style={{ justifyContent: "center" }}>
          <div className="calc1" onClick={() => modalopen(1)}>
            BMR
          </div>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="loginform1 signblock"
        ref={closemodal1}
      >
        <div className="regbackbtn" onClick={() => modalclose(0)}>
          <IoIosCloseCircle size={30} />
        </div>
        <div className="signup11">
          <label>Height(cm):</label>
          <input
            type="number"
            value={inputValue1}
            onChange={handleChange1}
          ></input>
        </div>
        <div className="signup11">
          <label>Weight(kg):</label>
          <input
            type="number"
            value={inputValue2}
            onChange={handleChange2}
          ></input>
        </div>
        <button type="submit" className="signupbtn">
          Calculate
        </button>
        <div style={{ marginTop: "20px", fontSize: "24px" }}>
          {submittedValue && <span>BMI: {submittedValue}</span>}
        </div>
      </form>
      <form
        onSubmit={handleSubmit2}
        className="loginform1 signblock"
        ref={closemodal2}
      >
        <div className="regbackbtn" onClick={() => modalclose(1)}>
          <IoIosCloseCircle size={30} />
        </div>
        <div className="signup11" style={{ marginTop: "10px" }}>
          <label>Age(yrs):</label>
          <input type="number" value={age1} onChange={handleChangex1}></input>
        </div>
        <div className="signup11">
          <label>Height(cm):</label>
          <input
            type="number"
            value={height1}
            onChange={handleChangex2}
          ></input>
        </div>
        <div className="signup11">
          <label>Weight(kg):</label>
          <input
            type="number"
            value={weight1}
            onChange={handleChangex3}
          ></input>
        </div>

        <div className="hkkh1">
          <div className="healthissues" style={{ marginTop: "-40px" }}>
            <label>Activity Level:</label>
            <div className="hselect1">
              <div
                ref={jcheck1}
                className="hissues1"
                style={{ height: "30px" }}
                key={0}
                onClick={() => changegcolor4(0)}
              >
                Sedentary
              </div>
              <div
                ref={jcheck2}
                className="hissues1"
                style={{ height: "30px" }}
                key={1}
                onClick={() => changegcolor4(1)}
              >
                Lightly Active
              </div>
              <div
                ref={jcheck3}
                className="hissues1"
                style={{ height: "30px" }}
                key={2}
                onClick={() => changegcolor4(2)}
              >
                Moderately Active
              </div>
              <div
                ref={jcheck4}
                className="hissues1"
                style={{ height: "30px" }}
                key={3}
                onClick={() => changegcolor4(3)}
              >
                Very Active
              </div>
              <div
                ref={jcheck5}
                className="hissues1"
                style={{ height: "30px" }}
                key={4}
                onClick={() => changegcolor4(4)}
              >
                Extremely Active
              </div>
            </div>
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

        <button type="submit" className="signupbtn">
          Calculate
        </button>
        <div style={{ marginTop: "20px", fontSize: "24px" }}>
          {submittedValue2 && <span>BMR: {submittedValue2}</span>}
        </div>
      </form>
    </div>
  );
};

export default Calculate;
