import React from "react";
import { useState, useEffect, useRef } from "react";
import { MdCancel } from "react-icons/md";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  Rectangle,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  Sector,
  ResponsiveContainer,
} from "recharts";
("recharts");
import "./Landingpage.css";

const data = [
  {
    name: "Jan",
    "User Gain": 1800,
  },
  {
    name: "Feb",
    "User Gain": 3000,
  },
  {
    name: "Mar",
    "User Gain": 2000,
  },
  {
    name: "Apr",
    "User Gain": 2780,
  },
  {
    name: "May",
    "User Gain": 1890,
  },
  {
    name: "Jun",
    "User Gain": 2390,
  },
  {
    name: "Jul",
    "User Gain": 0,
  },
  {
    name: "Aug",
    "User Gain": 0,
  },
  {
    name: "Sep",
    "User Gain": 0,
  },
  {
    name: "Oct",
    "User Gain": 0,
  },
  {
    name: "Nov",
    "User Gain": 0,
  },
  {
    name: "Dec",
    "User Gain": 0,
  },
];
const data2 = [
  {
    name: "Male",
    Number: 2800,
  },
  {
    name: "Female",
    Number: 3000,
  },
];
const COLORS2 = ["#0088FE", "#00C49F"];

const data3 = [
  {
    name: "Diabities",
    Number: 1800,
  },
  {
    name: "Low BP",
    Number: 2000,
  },
  {
    name: "High BP",
    Number: 1500,
  },
  {
    name: "Diabities + Low BP",
    Number: 550,
  },
  {
    name: "Diabities + High BP",
    Number: 300,
  },
  {
    name: "None",
    Number: 3000,
  },
];
const COLORS3 = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AF19FF",
  "#00C49F",
];
const data4 = [
  { name: "Minor(0-17)", Number: 2200 },
  { name: "Adult(18-60)", Number: 3000 },
  { name: "Older(60+)", Number: 1200 },
];

const data5 = [
  {
    name: "Veg",
    Number: 2800,
  },
  {
    name: "Non-Veg",
    Number: 3000,
  },
];
const COLORS5 = ["#0088FA", "#0b0b0b"];

const data6 = [
  {
    name: "Very Low",
    Calory: 150,
  },
  {
    name: "Low",
    Calory: 300,
  },
  {
    name: "Med",
    Calory: 700,
  },
  {
    name: "High",
    Calory: 900,
  },
  {
    name: "Very High",
    Calory: 680,
  },
];

const data7 = [
  {
    name: "Breakfast",
    Number: 2800,
  },
  {
    name: "Lunch",
    Number: 3000,
  },
  {
    name: "Dinner",
    Number: 1200,
  },
];

const COLORS7 = ["#0088FE", "#00C49F", "#FFBB28"];

const data8 = [
  {
    Year: 2022,
    Number: 1800,
  },
  {
    Year: 2023,
    Number: 2100,
  },
  {
    Year: 2024,
    Number: 2800,
  },
];

const Admin = () => {
  const usercontrol = useRef(null);
  const foodcontrol = useRef(null);
  const mail = useRef(null);
  const adm1 = useRef(null);
  const adm2 = useRef(null);
  const adm3 = useRef(null);
  const adm4 = useRef(null);
  const page = useRef(null);
  const show = useRef(null);
  const show2 = useRef(null);
  const showcancel = useRef(null);
  const showuserforedit = useRef(null);
  const [search1, setsearch1] = useState("");
  const [search2, setsearch2] = useState("");
  const [subject, setsubject] = useState("");
  const [message, setmessage] = useState("");

  const showuser = async (a) => {
    if (search1) {
      if (a == 0) {
        show.current.classList.remove("signblock");
        // showuserforedit.current.textContent = search1;
      }
      if (a == 1) {
        show.current.classList.add("signblock");
      }
    } else {
      alert("Enter search content");
    }
  };

  const [fooddisplaylist, setfooddisplaylist] = useState([]);

  const showfood = async (a) => {
    if (search2) {
      if (a == 0) {
        try {
          const response = await fetch("http://localhost:3000/foodsearch", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ search: search2 }),
          });
          const data = await response.json();
          const foodarray = data.food;
          if (foodarray.length == 0) {
            alert("No food found");
          } else {
            show2.current.classList.remove("signblock");
            setfooddisplaylist(foodarray);
          }
        } catch (error) {
          console.error("Error adding email:", error);
        }
      }
      if (a == 1) {
        show2.current.classList.add("signblock");
      }
    } else {
      alert("Enter search content");
    }
  };
  const editfood = (a, b) => {
    const j = fooddisplaylist[b];
    console.log(j);
  };

  const deletefood = (a, b) => {
    const j = fooddisplaylist[b];
    console.log(j);
  };

  const handleemail = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/sendmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subject, message }),
    });

    if (response.ok) {
      alert("Email sent successfully");
    } else {
      alert("Error sending email");
    }
  };

  const modalopen = (a) => {
    if (a == 0) {
      foodcontrol.current.classList.add("signblock");
      mail.current.classList.add("signblock");
      usercontrol.current.classList.remove("signblock");
      adm1.current.classList.add("admactive");
      adm2.current.classList.remove("admactive");
      adm3.current.classList.remove("admactive");
      adm4.current.classList.remove("admactive");
      page.current.classList.add("signblock");
    } else if (a == 1) {
      usercontrol.current.classList.add("signblock");
      mail.current.classList.add("signblock");
      foodcontrol.current.classList.remove("signblock");
      adm1.current.classList.remove("admactive");
      adm2.current.classList.add("admactive");
      adm3.current.classList.remove("admactive");
      adm4.current.classList.remove("admactive");

      page.current.classList.add("signblock");
    } else if (a == 2) {
      usercontrol.current.classList.add("signblock");
      foodcontrol.current.classList.add("signblock");
      mail.current.classList.remove("signblock");
      adm1.current.classList.remove("admactive");
      adm2.current.classList.remove("admactive");
      adm3.current.classList.add("admactive");
      adm4.current.classList.remove("admactive");
      page.current.classList.add("signblock");
    } else if (a == 3) {
      usercontrol.current.classList.add("signblock");
      foodcontrol.current.classList.add("signblock");
      mail.current.classList.add("signblock");
      adm1.current.classList.remove("admactive");
      adm2.current.classList.remove("admactive");
      adm3.current.classList.remove("admactive");
      adm4.current.classList.add("admactive");
      page.current.classList.remove("signblock");
    }
  };

  return (
    <>
      <div className="admin">
        <div className="admin101">
          <div className="admphoto"></div>
          <div className="adm" style={{ color: "white" }}>
            Name
          </div>
          <div
            className="adm admactive"
            ref={adm1}
            onClick={() => modalopen(0)}
          >
            User Control
          </div>
          <div className="adm" ref={adm2} onClick={() => modalopen(1)}>
            Food Control
          </div>
          <div className="adm" ref={adm3} onClick={() => modalopen(2)}>
            Send Mail
          </div>
          <div className="adm" ref={adm4} onClick={() => modalopen(3)}>
            Page Control
          </div>
          <div className="adm admlogout">Log Out</div>
        </div>
        <div className="admin102">
          <div className="admx usercharts" ref={usercontrol}>
            <div className="auchart1 ">
              <select className="auchart1select">
                <option value="Year">2024</option>
                <option value="Year">2023</option>
                <option value="Year">2022</option>
                <option value="Year">2021</option>
              </select>
              <LineChart
                width={580}
                height={300}
                data={data}
                margin={{
                  top: 50,
                  right: 15,
                  left: 10,
                  bottom: 0,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  dataKey="User Gain"
                  fill="#82ca9d"
                  activeBar={<Rectangle fill="gold" stroke="purple" />}
                />
              </LineChart>
            </div>
            <div className="auchart2">
              <PieChart width={450} height={300}>
                <Pie
                  data={data2}
                  cx={180}
                  cy={140}
                  innerRadius={40}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={0}
                  dataKey="Number"
                  label
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS2[index % COLORS2.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
            <div className="auchart3">
              <PieChart width={400} height={300}>
                <Pie
                  data={data3}
                  cx={200}
                  cy={110}
                  innerRadius={40}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={0}
                  dataKey="Number"
                  label
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS3[index % COLORS3.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
            <div className="auchart4">
              <BarChart
                width={450}
                height={250}
                data={data4}
                margin={{
                  top: 50,
                  right: 30,
                  left: 20,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Number" fill="#a4s7ab" />
              </BarChart>
            </div>
            <div className="usereditor">
              <input
                type="search"
                value={search1}
                className="usereditorinput"
                onChange={(e) => setsearch1(e.target.value)}
              ></input>
              <button className="usereditorbtn" onClick={() => showuser(0)}>
                Search User
              </button>
            </div>
            <div className="adminusershow signblock" ref={show}>
              <div className="adminusershowcancel" onClick={() => showuser(1)}>
                <MdCancel />
              </div>
              <div className="adminusershow1" ref={showuserforedit}>
                <div className="checkmuj"></div>
                <div className="checkmuj"></div>
                <div className="checkmuj"></div>
                <div className="checkmuj"></div>
                <div className="checkmuj"></div>
                <div className="checkmuj"></div>
                <div className="checkmuj"></div>
                <div className="checkmuj"></div>
                <div className="checkmuj"></div>
              </div>
            </div>
          </div>
          <div className="admx foodcharts signblock" ref={foodcontrol}>
            <div className="usereditor">
              <input
                type="search"
                value={search2}
                className="usereditorinput"
                onChange={(e) => setsearch2(e.target.value)}
              ></input>
              <button className="usereditorbtn" onClick={() => showfood(0)}>
                Search Food
              </button>
            </div>
            <div className="adminusershow signblock" ref={show2}>
              <div className="adminusershowcancel" onClick={() => showfood(1)}>
                <MdCancel />
              </div>
              <div className="adminusershow1" ref={showuserforedit}>
                <ul>
                  {fooddisplaylist.map((food, index) => (
                    <li key={index} className="checkmuj">
                      <div> {food}</div>
                      <div className="foodbtnsgap">
                        <button
                          className="editfoodbtn"
                          onClick={() => editfood(food, index)}
                        >
                          Edit
                        </button>
                        <button
                          className="deletefoodbtn"
                          onClick={() => deletefood(food, index)}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="afchart1">
              <h3 style={{ textAlign: "center", color: "white" }}>Food Type</h3>
              <PieChart width={350} height={250}>
                <Pie
                  data={data5}
                  cx={180}
                  cy={110}
                  innerRadius={0}
                  outerRadius={60}
                  fill="#8884d9"
                  paddingAngle={0}
                  dataKey="Number"
                  label
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS5[index % COLORS5.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
            <div className="afchart2">
              <h3 style={{ textAlign: "center", color: "white" }}>
                Food Calories
              </h3>
              <AreaChart
                width={600}
                height={250}
                data={data6}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="Calory"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorUv)"
                />
              </AreaChart>
            </div>
            <div className="afchart3">
              <h3 style={{ textAlign: "center", color: "white" }}>
                Food Category
              </h3>
              <PieChart width={350} height={250}>
                <Pie
                  data={data7}
                  cx={180}
                  cy={110}
                  innerRadius={0}
                  outerRadius={60}
                  fill="#8884d9"
                  paddingAngle={0}
                  dataKey="Number"
                  label
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS7[index % COLORS7.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
            <div className="afchart4">
              <h3 style={{ textAlign: "center", color: "white" }}>
                Total Food
              </h3>
              <BarChart
                width={550}
                height={280}
                data={data8}
                margin={{
                  top: 50,
                  right: 30,
                  left: 20,
                }}
              >
                <XAxis dataKey="Year" tick={{ fill: "#SS0000" }} />
                <YAxis tick={{ fill: "#AA200" }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Number" fill="#a4s7ab" />
              </BarChart>
            </div>
          </div>
          <div className="admx foodcharts adminmail signblock" ref={mail}>
            <input
              type="text"
              className="usereditorinput"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setsubject(e.target.value)}
            ></input>
            <textarea
              className="usereditorinput3"
              placeholder="Message"
              value={message}
              onChange={(e) => setmessage(e.target.value)}
            ></textarea>
            <button className="usereditorbtn" onClick={handleemail}>
              Send
            </button>
          </div>
          <div className="admx foodcharts signblock" ref={page}>
            Page Control
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
