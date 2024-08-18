import React from "react";
import AboutBackground from "../assets/about-background.png";
import img1 from "../assets/fc11.png";
import img2 from "../assets/workk.jpg";
import img3 from "../assets/fc3.png";
import img4 from "../assets/fc4.png";
import Navbar from "./Navbar";

const About = () => {
  return (
    <div>
      <div className="about-section-container slide">
        <div className="about-background-image-container">
          <img src={AboutBackground} alt="" />
        </div>
        <div className="about-section-image-container">
          <div className="k1">
            <div className="k11 block">
              <img src={img3} alt="" className="img3" />
            </div>
            <div className="k12 block">
              <img src={img1} alt="" className="img1" />
            </div>
          </div>
          <div className="k1">
            <div className="k12 block">
              <img src={img2} alt="" className="img2" />
            </div>
            <div className="k11 block">
              <img src={img4} alt="" className="img4" />
            </div>
          </div>
        </div>
        <div className="about-section-text-container block">
          <div className="a1">
            <h1 className="about-heading animate-pop-in">
              Food Is An Important Part Of A Balanced Diet
            </h1>
            <p className="about-text animate-pop-in">
              Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et
              elit. Dolor turpis molestie dui magnis facilisis at fringilla
              quam.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
