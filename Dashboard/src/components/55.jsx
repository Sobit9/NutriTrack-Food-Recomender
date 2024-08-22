import React from "react";
import { useLayoutEffect, useRef } from "react";
import AboutBackground from "../assets/about-background.png";
import img1 from "../assets/vegmeal.png";
import img2 from "../assets/nonveg.png";
import img3 from "../assets/keto.png";
import img4 from "../assets/carnivore.png";
import img5 from "../assets/paleo.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(".leftslide", {
        scrollTrigger: {
          trigger: ".imzoombox503",

          start: "top 1200px",
          end: "top 200px",
          scrub: 1,
        },
        scale: 2.5,
        translateY: 1100,
        translateX: -1600,
        transitionDuration: 0.2,
        ease: "power2.in",
        opacity: 0,
      });
    });

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(".rightslide", {
        scrollTrigger: {
          trigger: ".imzoombox503",

          start: "top 1200px",
          end: "top 200px",
          scrub: 1,
        },
        scale: 2.5,
        translateY: 1100,
        translateX: 1600,
        opacity: 0,
        transitionDuration: 0.2,
        ease: "power2.in",
      });
    });

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(".middleslide", {
        scrollTrigger: {
          trigger: ".imzoombox503",

          start: "top 1200px",
          end: "top 400px",
          scrub: 1,
        },
        scale: 3.5,
        translateY: 550,
        transitionDuration: 0.2,
        ease: "power2.in",
      });
    });

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(".imzoombox50131", {
        scrollTrigger: {
          trigger: ".imzoombox503",

          start: "top 600px",
          end: "top 400px",
          scrub: 1,
        },
        translateX: -80,
        transitionDuration: 0.2,
        ease: "power2.in",
      });
    });

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(".imzoombox5013 h2", {
        scrollTrigger: {
          trigger: ".imzoombox503",

          start: "top 500px",
          end: "top 400px",
          scrub: 1,
        },
        opacity: 1,
        transitionDuration: 0.2,
        ease: "power2.in",
      });
    });

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(".barchart", {
        scrollTrigger: {
          trigger: ".imzoombox503",

          start: "top 500px",
          end: "top 400px",
          scrub: 1,
        },
        opacity: 1,
        transitionDuration: 0.2,
        ease: "power2.in",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="infobox501">
        <div className="textbox501">
          <div className="textbox5011">
            <h2 className="textslider1">So</h2>
            <h3 className="textslider1" style={{ color: "red" }}>
              Know
            </h3>
            <h4 className="textslider1" style={{ color: "yellow" }}>
              What You Eat
            </h4>
          </div>
        </div>
        <div className="imzoombox501">
          <div className="imzoombox502 ">
            <div className="imzoombox5011 leftslide">
              <img src={img2}></img>
            </div>
            <div className="imzoombox5012 rightslide">
              <img src={img3}></img>
            </div>
            <div className="imzoombox5013 middleslide">
              <img src={img1} className="imzoombox50131"></img>
              <h2 className="imzoombox50132">Veg</h2>
              <div className="barchart">
                <div className="vegchart">
                  <div className="chartsvg">
                    <h2>Carb:</h2> <div className="carb101"></div>
                  </div>
                  <div className="chartsvg2">
                    <h2>Prot:</h2> <div className="prot101"></div>
                  </div>
                  <div className="chartsvg3">
                    <h2>Fat:</h2> <div className="fat101"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="imzoombox5014 leftslide">
              <img src={img4}></img>
            </div>
            <div className="imzoombox5015 rightslide">
              <img src={img5}></img>
            </div>
          </div>
          <div className="imzoombox503"></div>
        </div>
      </div>
      <div className="infobox502">
        <div className="infobox5021 blocker">
          <div className="infobox502textleft ">
            <h2>Non Veg</h2>
            <div className="barchart2">
              <div className="chartfoodd">
                <h2>Carb:</h2>
                <div className="carb102"></div>
              </div>
              <div className="chartfoodd">
                <h2>Prot:</h2>
                <div className="prot102"></div>
              </div>
              <div className="chartfoodd">
                <h2>Fat:</h2>
                <div className="fat102"></div>
              </div>
            </div>
          </div>
          <div className="infobox502img ">
            <img src={img2}></img>
          </div>
        </div>
        <div className="infobox5021 blocker">
          <div className="infobox502img">
            <img src={img3}></img>
          </div>
          <div className="infobox502textright">
            <h2>Keto</h2>
            <div className="barchart2">
              <div className="chartfoodd2">
                <h2>Carb:</h2>
                <div className="carb103"></div>
              </div>
              <div className="chartfoodd2">
                <h2>Prot:</h2>
                <div className="prot103"></div>
              </div>
              <div className="chartfoodd2">
                <h2>Fat:</h2>
                <div className="fat103"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="infobox5021 blocker">
          <div className="infobox502textleft">
            <h2>Carnivore</h2>
            <div className="barchart2">
              <div className="chartfoodd">
                <h2>Carb:</h2>
                <div className="carb104"></div>
              </div>
              <div className="chartfoodd">
                <h2>Prot:</h2>
                <div className="prot104"></div>
              </div>
              <div className="chartfoodd">
                <h2>Fat:</h2>
                <div className="fat104"></div>
              </div>
            </div>
          </div>
          <div className="infobox502img ">
            <img src={img4}></img>
          </div>
        </div>
        <div className="infobox5021 blocker">
          <div className="infobox502img ">
            <img src={img5}></img>
          </div>
          <div className="infobox502textright">
            <h2>Paleo</h2>
            <div className="barchart2">
              <div className="chartfoodd">
                <h2>Carb:</h2>
                <div className="carb102"></div>
              </div>
              <div className="chartfoodd">
                <h2>Prot:</h2>
                <div className="prot102"></div>
              </div>
              <div className="chartfoodd">
                <h2>Carb:</h2>
                <div className="fat102"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Work;

// const scrolref = useRef(null);
// const img_container1 = useRef(null);

// useLayoutEffect(() => {
//   let ctx = gsap.context(() => {
//     ScrollTrigger.create({
//       trigger: scrolref.current,
//       pin: scrolref.current,
//       start: "top top",
//       pinSpacing: false,
//       endTrigger: ".imgbox501",
//       end: "bottom bottom",
//     });

//     gsap.timeline({
//       scrollTrigger: {
//         trigger: img_container1.current,
//         pin: img_container1.current,
//         scrub: 0,
//         start: "0% 0%",
//       },
//     });
//     gsap.to(img_container1.current, {
//       transform: "translateZ(2000px)",
//       transitionDuration: 2,
//     });
//   });

//   return () => ctx.revert();
// }, []);
