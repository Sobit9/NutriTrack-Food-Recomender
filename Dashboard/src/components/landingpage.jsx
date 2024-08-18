import Navbar from "./Navbar";
import Home from "./Home";
import About from "./About";
import Work from "./44";
import Workk from "./55";
import Workkk from "./66";
import Testimonial from "./Testimonial";
import Contact from "./Contact";
import Footer from "./Footer";
import { Route, Routes } from "react-router-dom";
import "./Landingpage.css";

function Landingpage() {
  return (
    <div className="min-h-screen w-full max-w-[1900px] mx-auto flex flex-col items-center">
      <Navbar />
      <Home />
      <About />
      <Work />
      <Workk />
      <Workkk />
      <Testimonial />
      <Contact />
      <Footer />
    </div>
  );
}

export default Landingpage;
