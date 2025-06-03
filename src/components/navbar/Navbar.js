// styles
import "./Navbar.css";

// react
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();
  const [selectedIcon, setSelectedIcon] = useState("BATALHA");
  const [coins, setCoins] = useState(0);

  const icons = [
    {
      path: "/",
      name: "BATALHA",
      icon: "/assets/icons/battle.png",
      color: "#4C68F7",
      selectedColor: "#131D53",
    },
    {
      path: "/collection",
      name: "COLEÇÃO",
      icon: "/assets/icons/collection.png",
      color: "#EC5252",
      selectedColor: "#9A3535",
    },
    {
      path: "/store",
      name: "LOJA",
      icon: "/assets/icons/store.png",
      color: "#FBC213",
      selectedColor: "#B58B0A",
    }
  ];

  const changePage = (option) => {
    setSelectedIcon(option.name);
    navigate(option.path);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const storedCoins = parseInt(localStorage.getItem("coins") || "0", 10);
      setCoins(storedCoins);
    }, 500); // checa a cada 0.5 segundo

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div id="navbar">
        <div className="navbar_profile_box">
          <div className="navbar_profile_icon" />
          <div className="navbar_profile_info_box">
            <img
              src="/assets/icons/level.png"
              alt="Level"
              width={"25px"}
              height={"25px"}
            />
            <div className="navbar_profile_info">40/560</div>
          </div>
          <div className="navbar_profile_info_box">
            <img
              src="/assets/icons/coin.png"
              alt="Moeda"
              width={"25px"}
              height={"25px"}
            />
            <div className="navbar_profile_info">{coins}</div>
          </div>
        </div>
        <div className="navbar_options_box">
          {icons.map((option, index) => (
            <div
              className="navbar_option"
              style={{
                backgroundColor: option.color,
                width: selectedIcon === option.name ? "55%" : "50%",
                borderRight: selectedIcon === option.name ? `20px solid ${option.selectedColor}` : "none",
              }}
              onClick={() => changePage(option)}
              key={index}
            >
              <p>{option.name}</p>
              <img
                src={option.icon}
                className={`navbar_icon ${selectedIcon === option.name ? "selected" : "unselected"
                  }`}
                alt={option.name}
                width="25px"
                height="25px"
              />
            </div>
          ))}
        </div>
        <img className="navbar_logo" src="/logo.png" alt="Minha Imagem" />
      </div>
    </>
  );
}

export default Navbar;
