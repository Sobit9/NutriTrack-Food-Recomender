import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import Navbar from "../Navbar";

import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
import imgf3 from "../../assets/kosul2.png";
import imgf1 from "../../assets/sobit.png";
import imgf2 from "../../assets/ganesh.png";
import imgf4 from "../../assets/bhupu.png";
import imgf5 from "../../assets/ritik.png";
function About() {
  const [loading, setLoading] = useState(null);
  const rec = useRef(null);
  const breakfast = useRef(null);
  const lunch = useRef(null);
  const dinner = useRef(null);
  const bfw = useRef(null);
  const bfcal = useRef(null);
  const bfcarb = useRef(null);
  const bfprot = useRef(null);
  const bffat = useRef(null);
  const bfsalt = useRef(null);
  const bfsug = useRef(null);
  const dinnerw = useRef(null);
  const dinnercal = useRef(null);
  const dinnercarb = useRef(null);
  const dinnerprot = useRef(null);
  const dinnersug = useRef(null);
  const dinnersalt = useRef(null);
  const lunchw = useRef(null);
  const lunchcal = useRef(null);
  const lunchcarb = useRef(null);
  const lunchprot = useRef(null);
  const lunchsug = useRef(null);
  const lunchsalt = useRef(null);

  const displayrec = async () => {
    try {
      const response = await fetch("http://localhost:3000/fetchmeal");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Breakfast", data[0].food_name);
      console.log("Lunch", data[1].food_name);
      console.log("Dinner", data[2].food_name);
      console.log(data[0].food_type);
      console.log(data[1].food_type);
      console.log(data[2].food_type);
      console.log(data[0].nf_calories);
      console.log(data[1].nf_calories);
      console.log(data[2].nf_calories);
      console.log(data[0].nf_total_carbohydrate);
      console.log(data[1].nf_total_carbohydrate);
      console.log(data[2].nf_total_carbohydrate);
      console.log(data[0].nf_protein);
      console.log(data[1].nf_protein);
      console.log(data[2].nf_protein);
      console.log(data[0].nf_total_fat);
      console.log(data[1].nf_total_fat);
      console.log(data[2].nf_total_fat);
      console.log(data[0].nf_sugars);
      console.log(data[1].nf_sugars);
      console.log(data[2].nf_sugars);
      console.log(data[0].nf_sodium);
      console.log(data[1].nf_sodium);
      console.log(data[2].nf_sodium);

      // Check if refs are not null before setting innerHTML
      if (breakfast.current) {
        breakfast.current.innerHTML = data[0].food_name;
        bfw.current.innerHTML = data[0].food_type;
        bfcal.current.innerHTML = data[0].nf_calories;
        bfcarb.current.innerHTML = data[0].nf_total_carbohydrate;
        bfprot.current.innerHTML = data[0].nf_protein;
        bfsalt.current.innerHTML = data[0].nf_sodium;
        bfsug.current.innerHTML = data[0].nf_sugars;
      }
      if (lunch.current) {
        lunch.current.innerHTML = data[1].food_name;
        lunchw.current.innerHTML = data[1].food_type;
        lunchcal.current.innerHTML = data[1].nf_calories;
        lunchcarb.current.innerHTML = data[1].nf_total_carbohydrate;
        lunchprot.current.innerHTML = data[1].nf_protein;
        lunchsug.current.innerHTML = data[1].nf_sugars;
        lunchsalt.current.innerHTML = data[1].nf_sodium;
      }
      if (dinner.current) {
        dinner.current.innerHTML = data[2].food_name;
        dinnerw.current.innerHTML = data[2].food_type;
        dinnercal.current.innerHTML = data[2].nf_calories;
        dinnercarb.current.innerHTML = data[2].nf_total_carbohydrate;
        dinnerprot.current.innerHTML = data[2].nf_protein;
        dinnersug.current.innerHTML = data[2].nf_sugars;
        dinnersalt.current.innerHTML = data[2].nf_sodium;
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
        scale: 1.7,
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
        width: 280,
        height: 420,
        translateX: -10,
        translateY: -10,
        transitionDuration: 0.6,
        zIndex: 8,
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
          end: "top 400px",
          scrub: 1,
        },
        opacity: 1,
        width: 300,
        height: 350,
        translateY: -250,
        translateX: 440,
        transitionDuration: 0.1,
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
              <h2>
                Kosul<br></br> Gurung
              </h2>
            </div>
          </div>
          <div className="aitemp31 ">
            <img src={imgf1} alt="" />
          </div>
          <div className="aitemp32">
            <img src={imgf5} alt="" />
          </div>
          <div className="aitemp33">
            <img src={imgf2} alt="" />
          </div>
          <div className="aitemp34">
            <img src={imgf4} alt="" />
          </div>
          <div className="aitemptarg1"></div>
          <div className="aitemptarg2"></div>
        </div>
        <div className="aitemp4">
          <div className="aitemp41"></div>
          <div className="aitemp42 aitemp4x blocker">
            <div className="myimage2">
              <img src={imgf1} alt="" />
            </div>
            <div className="myinfo2">
              <h2>
                Sobit <br></br>Thapa
              </h2>
            </div>{" "}
          </div>
          <div className="aitemp43 aitemp4x blocker">
            <div className="myimage2">
              <img src={imgf5} alt="" />
            </div>
            <div className="myinfo2">
              <h2>
                Ritik<br></br> Gurung
              </h2>
            </div>
          </div>
          <div className="aitemp44 aitemp4x blocker">
            <div className="myimage2">
              <img src={imgf2} alt="" />
            </div>
            <div className="myinfo2">
              <h2>
                Ganesh <br></br>Gautam
              </h2>
            </div>
          </div>
          <div className="aitemp45 aitemp4x blocker">
            <div className="myimage2">
              <img src={imgf4} alt="" />
            </div>
            <div className="myinfo2">
              <h2>
                Bhupesh <br></br> Shrestha
              </h2>
            </div>
          </div>
        </div>
        {/* <div className="recomender">
          <h1>Hello User!</h1>
          <h3>How you doing?</h3>
          <p>Want some recommendations?</p>
          <p>Click the button below</p>
          <button className="recbutton" onClick={() => displayrec()}>
            Recommendations
          </button>
          <div ref={rec} className="recomendedmeal blockrec">
            <div className="breakfastrec RECC">
              <h1>Breakfast</h1>
              <h2>
                Mealname:<div ref={breakfast}>a</div>
              </h2>
              <h2>
                Food Type:<div ref={bfw}>a</div>
              </h2>
              <h2>
                Calorie:<div ref={bfcal}>a</div>
              </h2>
              <h2>
                Carbs:<div ref={bfcarb}>a</div>
              </h2>
              <h2>
                Prot:<div ref={bfprot}>a</div>
              </h2>
              <h2>
                Salt:<div ref={bfsalt}>a</div>
              </h2>
              <h2>
                Sugar:<div ref={bfsug}>a</div>
              </h2>
            </div>
            <div className="lunchrec RECC">
              <h1>Lunch</h1>
              <h2>
                Mealname:<div ref={lunch}>a</div>
              </h2>
              <h2>
                Food Type:<div ref={lunchw}>a</div>
              </h2>
              <h2>
                Calorie:<div ref={lunchcal}>a</div>
              </h2>
              <h2>
                Carbs:<div ref={lunchcarb}>a</div>
              </h2>
              <h2>
                Prot:<div ref={lunchprot}>a</div>
              </h2>
              <h2>
                Salt:<div ref={lunchsalt}>a</div>
              </h2>
              <h2>
                Sugar:<div ref={lunchsug}>a</div>
              </h2>
            </div>
            <div className="dinnerrec RECC">
              <h1>Dinner</h1>
              <h2>
                Mealname:<div ref={dinner}>a</div>
              </h2>
              <h2>
                Food Type:<div ref={dinnerw}>a</div>
              </h2>
              <h2>
                Calorie:<div ref={dinnercal}>a</div>
              </h2>
              <h2>
                Carbs:<div ref={dinnercarb}>a</div>
              </h2>
              <h2>
                Prot:<div ref={dinnerprot}>a</div>
              </h2>
              <h2>
                Salt:<div ref={dinnersalt}>a</div>
              </h2>
              <h2>
                Sugar:<div ref={dinnersug}>a</div>
              </h2>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default About;
