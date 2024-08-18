import React from "react";

import { useRef, useState, useEffect } from "react";
import img1 from "../assets/control-img-1.png";
import img2 from "../assets/control-img-2.png";
import img3 from "../assets/control-img-3.png";
import img4 from "../assets/control-img-4.png";
import img5 from "../assets/control-img-1.png";
import img6 from "../assets/control-img-2.png";
import img7 from "../assets/control-img-3.png";
import img8 from "../assets/control-img-4.png";

const Aii = () => {
  const circleref = useRef(null);

  const rectangleref1 = useRef(null);
  const rectangleref2 = useRef(null);
  const rectangleref3 = useRef(null);
  const rectangleref4 = useRef(null);

  const rectangleref = [
    rectangleref1,
    rectangleref2,
    rectangleref3,
    rectangleref4,
  ];

  const controlref1 = useRef(null);
  const controlref2 = useRef(null);
  const controlref3 = useRef(null);
  const controlref4 = useRef(null);
  const controlref = [controlref1, controlref2, controlref3, controlref4];

  const intervalfn = () => {
    let i = 0,
      j = 1,
      k,
      intervalid;
    intervalid = setInterval(() => {
      if (circleref.current) {
        circleref.current.style.rotate = `-${++i * 90}deg`;
      }
    }, 7000);
  };

  intervalfn();

  const intervalfn2 = (a) => {
    let i = 0,
      j = 1,
      intervalid;
    intervalid = setInterval(() => {
      let k;
      if (i === 0) {
        k = 3;
      } else if (i === 1) {
        k = 0;
      } else if (i === 2) {
        k = 1;
      } else if (i === 3) {
        k = 2;
      }

      rectangleref.forEach((ref, index) => {
        if (index !== a) {
          if (ref.current) {
            ref.current.style.opacity = "0";
          }
        }
      });

      if (a[i].current) {
        if (a[k].current) {
          a[k].current.style.opacity = `0`;
          a[i].current.style.transform = `translateX(-40px)`;
          a[i].current.style.opacity = `1`;
        }
      }

      i++;
      i === 4 ? (i = 0) : (i = i);
    }, 7000);
  };

  intervalfn2(rectangleref);

  const intervalfn3 = (a) => {
    let i = 1,
      j = 1,
      intervalid;
    intervalid = setInterval(() => {
      let k;
      if (i == 0) {
        k = 3;
      } else if (i == 1) {
        k = 0;
      } else if (i == 2) {
        k = 1;
      } else if (i == 3) {
        k = 2;
      }

      controlref.forEach((ref, index) => {
        if (index !== i) {
          if (ref.current) {
            ref.current.classList.remove("active");
          }
        }
      });

      if (a[i].current) {
        if (a[k].current) {
          a[k].current.classList.remove("active");
          a[i].current.classList.add("active");
        }
      }

      i++;
      i == 4 ? (i = 0) : (i = i);
    }, 7000);
  };

  intervalfn3(controlref);

  const handleclick = (a) => {
    console.log(a);
    rectangleref.forEach((ref, index) => {
      if (index !== a) {
        ref.current.style.opacity = "0";
      }
    });

    rectangleref[a].current.style.opacity = `1`;
    rectangleref[a].current.style.transform = `translateX(-40px)`;

    let j = a + 1;
    j == 4 ? (j = 0) : (j = j);
    circleref.current.style.rotate = `-${j * 90}deg`;

    controlref.forEach((ref, index) => {
      if (index !== j) {
        ref.current.classList.remove("active");
      }
    });
    controlref[j].current.classList.add("active");
  };

  return (
    <>
      <div className="containerx">
        <div className="carouselcontainerx">
          <div ref={circleref} className="carouselx">
            <div className="slidex">
              <img src={img1} alt="" />
            </div>
            <div className="slidex">
              <img src={img2} alt="" />
            </div>
            <div className="slidex">
              <img src={img3} alt="" />
            </div>
            <div className="slidex">
              <img src={img4} alt="" />
            </div>
          </div>
          <div className="carousely">
            <div
              onClick={() => handleclick(3)}
              ref={controlref1}
              className="asss"
            >
              <img src={img5} alt="" />
            </div>

            <div
              onClick={() => handleclick(0)}
              ref={controlref2}
              className="asss"
            >
              <img src={img6} alt="" />
            </div>

            <div
              onClick={() => handleclick(1)}
              ref={controlref3}
              className="asss"
            >
              <img src={img8} alt="" />
            </div>

            <div
              onClick={() => handleclick(2)}
              ref={controlref4}
              className="asss"
            >
              <img src={img7} alt="" />
            </div>
          </div>
          <div ref={rectangleref1} className="carouselz z1"></div>
          <div ref={rectangleref2} className="carouselz z2">
            {" "}
          </div>
          <div ref={rectangleref3} className="carouselz z3">
            {" "}
          </div>
          <div ref={rectangleref4} className="carouselz z4">
            {" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default Aii;
