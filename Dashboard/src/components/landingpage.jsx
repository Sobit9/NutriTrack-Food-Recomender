import "./Landingpage.css";
import Navbar from "./Navbar";
import Home from "./Home";
import About from "./About";
import Work from "./44";
import Workk from "./55";
import Workkk from "./66";
import AITEMP from "./77";
import Testimonial from "./Testimonial";
import Contact from "./Contact";
import Footer from "./Footer";
import Admin from "./admin";
import { Route, Routes } from "react-router-dom";

function Landingpage() {
  return (
    <div className="App">
      <Navbar />
      <Home />
      <About />
      <Work />
      <Workk />
      <Workkk />
      <AITEMP />
      <Testimonial />
      <Contact />
      <Footer />
    </div>
  );
}

export default Landingpage;
