// styles
import "./Battle.css";

// json
//import charactersData from "../../data/characters.json";

// react
//import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// react icons
//import { BiMap } from "react-icons/bi";

//components
import { BannerInfo } from "../../components/banner/Banner";

function Battle() {
  const navigate = useNavigate();

  const levels = [
    {
      name: "FÁCIL",
      background: "/assets/backgrounds/background_easy.png",
      level: "easy",
    },
    {
      name: "MÉDIO",
      background: "/assets/backgrounds/background_medium.png",
      level: "medium",
    },
    {
      name: "DIFÍCIL",
      background: "/assets/backgrounds/background_hard.png",
      level: "hard",
    },
  ];

  const goToLevel = (level) => {
    navigate("/game", { state: { difficulty: level } });
  };

  return (
    <div id="battle">
      <BannerInfo>{"SELECIONE A DIFICULDADE..."}</BannerInfo>
      <div className="battle_options">
        {levels.map((level, index) => (
          <div
            className="battle_option"
            style={{
              backgroundImage: `url(${level.background})`,
            }}
            onClick={() => goToLevel(level.level)}
            key={index}
          >
            <p>{level.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Battle;
