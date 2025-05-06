// styles
import "./Character.css";

// json
//import charactersData from "../../data/characters.json";

// react
//import React, { useState } from "react";
//import { Link } from "react-router-dom";

// react icons
//import { BiMap } from "react-icons/bi";

function Character() {
  return (
    <div id="character">
      <div className="character_button" />
      <div className="character_box">
        <img className="character_card" src="/assets/cards/thanos.png" alt="" />
        <div className="character_text">
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC.
        </div>
      </div>
    </div>
  );
}

export default Character;
