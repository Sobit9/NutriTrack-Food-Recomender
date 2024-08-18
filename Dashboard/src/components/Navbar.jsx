/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import Logo from "../assets/nutrilogo.png";
import { IoSearchCircleOutline } from "react-icons/io5";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { FcCalculator } from "react-icons/fc";
import { IoIosHome } from "react-icons/io";
import { FaInfoCircle } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuOptions = [
    {
      text: "Home",
      icon: <IoIosHome />,
      Link: "/",
    },
    {
      text: "About",
      icon: <FaInfoCircle />,
      Link: "/",
    },
    {
      text: "Calculator",
      icon: <FcCalculator />,
      Link: "/",
    },
  ];
  return (
    <nav className="sticky top-0 z-10 flex items-center justify-evenly">
      <div className="flex items-center justify-between min-h-[90px] gap-[40px]">
        <div className="hidden md:block max-w-[200px]  sm:max-w-[140px]">
          <img className="max-w-full h-auto" src={Logo} alt="" />
        </div>
        <div className="hidden md:flex md:mr-4 md:text-base  items-center justify-center gap-[40px] w-[700px] h-[50px] bg-white/50 backdrop-blur-[10px] rounded-[10px]">
          <Link
            className="md:mr-4 md:text-base no-underline capitalize px-2.5 text-[rgb(32,31,31)] text-[1.2rem] font-semibold flex items-center justify-between hover:text-[#e70a0a]"
            to="/"
          >
            Home
          </Link>
          <Link
            className="sm:justify-center sm:flex-col md:mr-4 md:text-base no-underline capitalize px-2.5 text-[rgb(32,31,31)] text-[1.2rem] font-semibold flex items-center justify-between hover:text-[#e70a0a]"
            to="/about"
          >
            About
          </Link>
          <Link
            className="md:mr-4 md:text-base no-underline capitalize px-2.5 text-[rgb(32,31,31)] text-[1.2rem] font-semibold flex items-center justify-between hover:text-[#e70a0a]"
            to="/calculate"
          >
            Calculator
          </Link>
          <div className="flex flex-row">
            <input
              type="text"
              placeholder="Search"
              className="text-base w-[200px] border border-gray-300 rounded-md"
            />
            <a className="md:text-[25px] text-[30px]" href="">
              <IoSearchCircleOutline className="hover:animate-[text-animation_0.5s_forwards] hover:text-[#007bff]" />
            </a>
          </div>
        </div>
        <div className=" flex justify-between items-center gap-2.5">
          <Link to={"/register"}>
            {" "}
            <button className="md:text-base py-3.5 px-7 w-[150px] bg-[rgb(129,224,106)] outline-none border-none rounded-full text-[1.1rem] cursor-pointer font-semibold transition duration-200 shadow-[0_4px_4px_rgba(41,49,58,0.2)] hover:bg-[rgb(234,234,234)]">
              Register
            </button>
          </Link>
          <Link to={"/login"}>
            <button className="md:text-base py-3.5 px-7 w-[150px] bg-[rgb(129,224,106)] outline-none border-none rounded-full text-[1.1rem] cursor-pointer font-semibold transition duration-200 shadow-[0_4px_4px_rgba(41,49,58,0.2)] hover:bg-[rgb(234,234,234)]">
              Log In
            </button>
          </Link>
        </div>
        <div className="text-[1.5rem] cursor-pointer sm:hidden">
          <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
        </div>
        <Drawer
          open={openMenu}
          onClose={() => setOpenMenu(false)}
          anchor="right"
        >
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={() => setOpenMenu(false)}
            onKeyDown={() => setOpenMenu(false)}
          >
            <List>
              {menuOptions.map((item) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
          </Box>
        </Drawer>
      </div>
    </nav>
  );
};

export default Navbar;
