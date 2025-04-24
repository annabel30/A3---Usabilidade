// styles
import "./Battle.css";

// json
//import charactersData from "../../data/characters.json";

// react
//import React, { useState } from "react";
//import { Link } from "react-router-dom";

// react icons
//import { BiMap } from "react-icons/bi";

//components
import { BannerInfo } from "../../components/banner/Banner";

function Battle() {
  return (
    <div id="battle">
      <p>battle</p>
      <BannerInfo>{"SELECIONE A DIFICULDADE..."}</BannerInfo>
      <div className="battle_options">
        <div className="battle_option">FÁCIL</div>
        <div className="battle_option">MÉDIO</div>
        <div className="battle_option">DIFÍCIL</div>
      </div>
    </div>
  );
}

export default Battle;
