import React, { useEffect } from "react";
import { useState, useRef } from "react";

import imgf1 from "../Assets/burger.png";
import imgf2 from "../Assets/roll.png";
import imgf3 from "../Assets/fatman.png";
import imgf4 from "../Assets/cake.png";
import imgf5 from "../Assets/pizza.png";
import imgf6 from "../Assets/fruit.png";
import imgf7 from "../Assets/vegmix.png";
import imgf8 from "../Assets/fitgirl.png";
import imgf9 from "../Assets/salad.png";
import imgf10 from "../Assets/fruitjuice.png";

const Work = () => {
  const divToWatchRef = useRef(null); // Create a ref for the div to watch
  const divwatcher = useRef(null);
  const textwatch = useRef(null);
  const textwatch2 = useRef(null);

  const [isScrolled, setIsScrolled] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isviewed, setIsViewed] = useState(false);
  const [isviewed2, setIsViewed2] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]; // We only observe one element, so there will only be one entry
        if (entry.isIntersecting && !hasScrolled) {
          window.scrollBy({
            top: 875, // Adjust the scroll amount as needed
            behavior: "smooth",
          });
          setHasScrolled(true);
        }
      },
      { threshold: 0.4 }
    ); // Adjust threshold to 0.1 to trigger when at least 10% of the div is visible

    if (window.scrollY > 750) {
      setHasScrolled(true);
    } else {
      setHasScrolled(false);
    }
    if (divToWatchRef.current) {
      observer.observe(divToWatchRef.current); // Observe the target div
    }

    return () => {
      if (divToWatchRef.current) {
        observer.unobserve(divToWatchRef.current); // Clean up observer when component unmounts or ref changes
      }
    };
  }, [hasScrolled]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]; // We only observe one element, so there will only be one entry
        if (entry.isIntersecting && !isScrolled) {
          window.scrollBy({
            top: 800, // Adjust the scroll amount as needed
            behavior: "smooth",
          });
          setIsScrolled(true);
        }
      },
      { threshold: 0.075 }
    ); // Adjust threshold to 0.1 to trigger when at least 10% of the div is visible

    if (window.scrollY > 850) {
      setIsScrolled(true);
    }

    if (divwatcher.current) {
      observer.observe(divwatcher.current); // Observe the target div
    }

    return () => {
      if (divwatcher.current) {
        observer.unobserve(divwatcher.current); // Clean up observer when component unmounts or ref changes
      }
    };
  }, [isScrolled]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]; // We only observe one element, so there will only be one entry
        if (entry.isIntersecting && !isviewed) {
          textwatch.current.classList.add("translate");
          isviewed(true);
        } else {
          textwatch.current.classList.remove("translate");
        }
      },
      { threshold: 0.5 }
    ); // Adjust threshold to 0.1 to trigger when at least 10% of the div is visible

    if (textwatch.current) {
      observer.observe(textwatch.current); // Observe the target div
    }

    return () => {
      if (textwatch.current) {
        observer.unobserve(textwatch.current); // Clean up observer when component unmounts or ref changes
      }
    };
  }, [isviewed]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isviewed2) {
            textwatch2.current.classList.add("translate2");
            isviewed2(true);
          } else {
            textwatch2.current.classList.remove("translate2");
          }
        });
      },
      { threshold: 0.5 }
    ); // Adjust threshold to 0.1 to trigger when at least 10% of the div is visible

    if (textwatch2.current) {
      observer.observe(textwatch2.current); // Observe the target div
    }

    return () => {
      if (textwatch2.current) {
        observer.unobserve(textwatch2.current); // Clean up observer when component unmounts or ref changes
      }
    };
  }, [isviewed2]);

  return (
    <>
      <div className="work-section-wrapper slide">
        <div className="blackscarf" ref={divToWatchRef}></div>
        <div className="infox">
          <h1 className="b113" ref={textwatch}>
            <p className="p101">You Are</p>{" "}
          </h1>
          <div className="infoximg block">
            <div className="d101 ">
              <img src={imgf1}></img>
            </div>
            <div className="d102 ">
              <img src={imgf2}></img>
            </div>
            <div className="d103 ">
              <img src={imgf3}></img>
            </div>
            <div className="d104 ">
              <img src={imgf4}></img>
            </div>
            <div className="d105">
              <img src={imgf5}></img>
            </div>
          </div>
        </div>
        <div className="infox2" ref={divwatcher}>
          <div className="infoximg block">
            <div className="d101">
              <img src={imgf6}></img>
            </div>
            <div className="d102">
              <img src={imgf7}></img>
            </div>
            <div className="d103">
              <img src={imgf8}></img>
            </div>
            <div className="d104">
              <img src={imgf9}></img>
            </div>
            <div className="d105">
              <img src={imgf10}></img>
            </div>
          </div>
          <h1 className="b113" ref={textwatch2}>
            <p className="p101">
              What you <span className="texthighlight">Eat</span>
            </p>{" "}
          </h1>
        </div>
      </div>
    </>
  );
};

export default Work;
