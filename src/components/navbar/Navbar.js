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
    { path: "/store", name: "Loja", icon: BiCart, selectedIcon: BiSolidCart },
    {
      path: "/",
      name: "Batalha",
      icon: RiSwordLine,
      selectedIcon: RiSwordFill,
    },
    {
      name: "/collection",
      name: "Coleção",
      icon: TbCards,
      selectedIcon: TbCardsFilled,
    },
  ];

  const changePage = (page) => {
    setSelectedIcon(page);
    navigate(page);
  };

  return (
    <>
      <div id="navbar">
        <div className="navbar_profile_box">
          <div className="navbar_profile_icon"></div>
        </div>
        <div className="navbar_options_box">
          {icons.map((option, index) =>
            selectedIcon === option.name ? (
              <div className="navbar_option">
                <option.selectedIcon
                  key={index}
                  className="navbar_icon selected"
                />
                <p>{option.name}</p>
              </div>
            ) : (
              <div className="navbar_option">
                <option.icon
                  className="navbar_icon unselected"
                  key={index}
                  onClick={() => changePage(option.name)}
                />
                <p>{option.name}</p>
              </div>
            )
          )}
        </div>
        <img className="navbar_logo" src="/logo.png" alt="Minha Imagem" />
      </div>
    </>
  );
}

export default Navbar;
