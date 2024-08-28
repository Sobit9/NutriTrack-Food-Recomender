import React ,{useState, useEffect, useRef} from 'react'

 function Foodrecomender() {
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

  return (<>
  <div className="recomender">
          <h1>Hello User!</h1>
          {/* <h3>How you doing?</h3> */}
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
                Carbs:<div ref={bfcarb}>a</div>gm
              </h2>
              <h2>
                Prot:<div ref={bfprot}>a</div>gm
              </h2>
              <h2>
                Salt:<div ref={bfsalt}>a</div>mg
              </h2>
              <h2>
                Sugar:<div ref={bfsug}>a</div>gm
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
                Carbs:<div ref={lunchcarb}>a</div>gm
              </h2>
              <h2>
                Prot:<div ref={lunchprot}>a</div>gm
              </h2>
              <h2>
                Salt:<div ref={lunchsalt}>a</div>mg
              </h2>
              <h2>
                Sugar:<div ref={lunchsug}>a</div>gm
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
                Carbs:<div ref={dinnercarb}>a</div>gm
              </h2>
              <h2>
                Prot:<div ref={dinnerprot}>a</div>gm
              </h2>
              <h2>
                Salt:<div ref={dinnersalt}>a</div>mg
              </h2>
              <h2>
                Sugar:<div ref={dinnersug}>a</div>gm
              </h2>
            </div>
          </div>
        </div>
  </>
  )
}
export default Foodrecomender