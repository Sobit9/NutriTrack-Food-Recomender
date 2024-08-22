import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import Navbar from "../Navbar";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import imgf3 from "../../assets/kosul.png";
function About() {
  const [loading, setLoading] = useState(null);
  const rec = useRef(null);
  const breakfast = useRef(null);
  const lunch = useRef(null);
  const dinner = useRef(null);

  const displayrec = async () => {
    try {
      const response = await fetch("http://localhost:4000/fetchmeal");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Breakfast", data[0].food_name);
      console.log("Lunch", data[1].food_name);
      console.log("Dinner", data[2].food_name);

      // Check if refs are not null before setting innerHTML
      if (breakfast.current) {
        breakfast.current.innerHTML = data[0].food_name;
      }
      if (lunch.current) {
        lunch.current.innerHTML = data[1].food_name;
      }
      if (dinner.current) {
        dinner.current.innerHTML = data[2].food_name;
      }
      if (rec.current) {
        rec.current.classList.remove("blockrec");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(".aitemp3", {
        scrollTrigger: {
          trigger: ".aitemptarg1",

          start: "top 600px",
          end: "top 400px",
          scrub: 0.01,
        },
        scale: 2,
        transitionDuration: 0.8,
        ease: "power2.in",
      });
    });

    return () => ctx.revert();
  }, []);
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(".aitemp31", {
        scrollTrigger: {
          trigger: ".aitemptarg1",

          start: "top 600px",
          end: "top 400px",
          scrub: 0.01,
        },
        opacity: 0,
        scale: 1.5,
        translateX: -100,
        translateY: -100,
        transitionDuration: 2,
        ease: "power2.in",
      });
    });

    return () => ctx.revert();
  }, []);
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(".aitemp32", {
        scrollTrigger: {
          trigger: ".aitemptarg1",

          start: "top 600px",
          end: "top 400px",
          scrub: 0.01,
        },
        opacity: 0,
        scale: 1.5,

        translateX: 100,
        translateY: -100,
        transitionDuration: 2,
        ease: "power2.in",
      });
    });

    return () => ctx.revert();
  }, []);
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(".aitemp33", {
        scrollTrigger: {
          trigger: ".aitemptarg1",

          start: "top 600px",
          end: "top 400px",
          scrub: 0.01,
        },
        opacity: 0,
        scale: 1.5,

        translateX: -100,
        translateY: 100,
        transitionDuration: 2,
        ease: "power2.in",
      });
    });

    return () => ctx.revert();
  }, []);
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(".aitemp34", {
        scrollTrigger: {
          trigger: ".aitemptarg1",

          start: "top 600px",
          end: "top 400px",
          scrub: 0.01,
        },
        opacity: 0,
        scale: 1.5,

        translateX: 100,
        translateY: 100,
        transitionDuration: 2,
        ease: "power2.in",
      });
    });

    return () => ctx.revert();
  }, []);
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(".aitemp3", {
        scrollTrigger: {
          trigger: ".aitemptarg2",
          start: "top 500px",
          end: "top 300px",
          scrub: 0.01,
        },
        width: 600,
        height: 300,
        translateX: -150,
        borderRadius: 20,
        transitionDuration: 0.6,
        ease: "power2.in",
      });
    });

    return () => ctx.revert();
  }, []);
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(".myimage", {
        scrollTrigger: {
          trigger: ".aitemptarg2",
          start: "top 500px",
          end: "top 300px",
          scrub: 0.01,
        },
        width: 300,
        height: 350,
        translateX: -20,
        transitionDuration: 0.6,
        ease: "power2.in",
      });
    });

    return () => ctx.revert();
  }, []);
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(".myinfo h2", {
        scrollTrigger: {
          trigger: ".aitemptarg2",
          start: "top 500px",
          end: "top 300px",
          scrub: 0.01,
        },
        opacity: 1,
        width: 300,
        height: 350,
        translateY: -300,
        translateX: 400,
        transitionDuration: 0.2,
        ease: "power2.in",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="aboutter">
        <Navbar />
        <div className="aitemp2">
          <h1 className="attempth1">Nutronix</h1>
          <div className="aitemp3">
            <div>
              <img className="myimage" src={imgf3} alt="" />
            </div>
            <div className="myinfo">
              <h2>Kosul Gurung</h2>
            </div>
          </div>
          <div className="aitemp31 ">
            <img src={imgf3} alt="" />
          </div>
          <div className="aitemp32">
            <img src={imgf3} alt="" />
          </div>
          <div className="aitemp33">
            <img src={imgf3} alt="" />
          </div>
          <div className="aitemp34">
            <img src={imgf3} alt="" />
          </div>
          <div className="aitemptarg1"></div>
          <div className="aitemptarg2"></div>
        </div>
        <div className="aitemp4">
          <div className="aitemp41"></div>
          <div className="aitemp42 aitemp4x blocker">
            <div className="myimage2">
              <img src={imgf3} alt="" />
            </div>
            <div className="myinfo2">
              <h2>
                Kosul <br></br>Gurung
              </h2>
            </div>{" "}
          </div>
          <div className="aitemp43 aitemp4x blocker">
            <div className="myimage2">
              <img src={imgf3} alt="" />
            </div>
            <div className="myinfo2">
              <h2>
                Kosul<br></br> Gurung
              </h2>
            </div>
          </div>
          <div className="aitemp44 aitemp4x blocker">
            <div className="myimage2">
              <img src={imgf3} alt="" />
            </div>
            <div className="myinfo2">
              <h2>
                Kosul <br></br>Gurung
              </h2>
            </div>
          </div>
          <div className="aitemp45 aitemp4x blocker">
            <div className="myimage2">
              <img src={imgf3} alt="" />
            </div>
            <div className="myinfo2">
              <h2>
                Kosul <br></br>Gurung
              </h2>
            </div>
          </div>
        </div>
        <div className="recomender">
          <h1>Hello Bro!</h1>
          <h3>How you doing</h3>
          <p>want some recommendations</p>
          <p>Click the button below</p>
          <button className="recbutton" onClick={() => displayrec()}>
            Recommendations
          </button>
          <div ref={rec} className="recomendedmeal blockrec">
            <div className="breakfastrec RECC">
              <h1>Breakfast</h1>
              <h2>
                Mealname:<div ref={breakfast}></div>
              </h2>
            </div>
            <div className="lunchrec RECC">
              <h1>Lunch</h1>
              <h2>
                Mealname:<div ref={lunch}></div>
              </h2>
            </div>
            <div className="dinnerrec RECC">
              <h1>Dinner</h1>
              <h2>
                Mealname:<div ref={dinner}></div>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
