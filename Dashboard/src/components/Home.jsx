import React from "react";
import BannerBackground from "../assets/home-banner-background.png";
import BannerImage from "../assets/homeimg.png";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "@mui/material";
const Home = () => {
  return (
    <div className="home-container">
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section b111">
          <h1 className="primary-heading animate-pop-in">
            Enjoy Healthy food in your daily life
          </h1>
          <p className="primary-text animate-pop-in">
            Track what you eat, how much you eat and your weight.
          </p>
          <button className="secondary-button animate-pop-in">
            Calculate Now <FiArrowRight />{" "}
          </button>
        </div>
        <div className="home-image-section b112">
          <img src={BannerImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
