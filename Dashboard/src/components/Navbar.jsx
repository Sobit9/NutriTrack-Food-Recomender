/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef } from "react";
import Logo from "../assets/nutrilogo2.png";
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
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

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

  const handleSearch = () => {
    const query = searchInputRef.current.value;
    if (query) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <nav>
      <div className="navbarr">
        <div className="nav-logo-container">
          <img src={Logo} alt="" />
        </div>
        <div className="navbar-links-container">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/calculate">Calculator</Link>
          <div className="searchcontent">
            <input
              type="text"
              placeholder="Search"
              className="search"
              ref={searchInputRef}
            />
            <IoSearchCircleOutline
              className="navbar-cart-icon"
              onClick={handleSearch}
            />
          </div>
        </div>
        <div className="btnsmanager">
          <Link to={"/register"}>
            {" "}
            <button className="primary-button">Register</button>
          </Link>
          <Link to={"/login"}>
            <button className="primary-button">Log In</button>
          </Link>
        </div>
        <div className="navbar-menu-container">
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
