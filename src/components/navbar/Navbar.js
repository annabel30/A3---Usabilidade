// styles
import "./Navbar.css";

// react
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// react icons
import { BiCart } from "react-icons/bi";
import { BiSolidCart } from "react-icons/bi";
import { RiSwordLine } from "react-icons/ri";
import { RiSwordFill } from "react-icons/ri";
import { TbCards } from "react-icons/tb";
import { TbCardsFilled } from "react-icons/tb";

function Navbar() {
  const navigate = useNavigate();
  const [selectedIcon, setSelectedIcon] = useState("");

  const icons = [
    { name: "/store", icon: BiCart, selectedIcon: BiSolidCart },
    { name: "/", icon: RiSwordLine, selectedIcon: RiSwordFill },
    { name: "/collection", icon: TbCards, selectedIcon: TbCardsFilled },
  ];

  const changePage = (page) => {
    setSelectedIcon(page);
    navigate(page);
  };

  return (
    <>
      <div id="navbar">
        <div className="profile_box"></div>
        <div className="navbar_options"></div>
        {/* {icons.map((option, index) =>
            selectedIcon === option.name ? (
              <option.selectedIcon
                key={index}
                className="navbar_icon selected"
              />
            ) : (
              <option.icon
                className="navbar_icon unselected"
                key={index}
                onClick={() => changePage(option.name)}
              />
            )
          )} */}
      </div>
    </>
  );
}

export default Navbar;
