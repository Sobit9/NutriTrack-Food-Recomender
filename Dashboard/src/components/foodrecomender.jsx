import React ,{useState, useEffect, useRef} from 'react'

 function Foodrecomender() {
    const [loading, setLoading] = useState(null);
  const rec = useRef(null);
  const breakfast = useRef(null);
  const lunch = useRef(null);
  const dinner = useRef(null);

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

  return (<>
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
  </>
  )
}
export default Foodrecomender