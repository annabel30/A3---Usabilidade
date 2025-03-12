// styles
import "./Navbar.css";

// json
//import charactersData from "../../data/characters.json";

// react
//import React, { useState } from "react";
//import { Link } from "react-router-dom";

// react icons
import { BiCart } from "react-icons/bi";
//import { BiSolidCart } from "react-icons/bi";
import { RiSwordLine } from "react-icons/ri";
//import { RiSwordFill } from "react-icons/ri";

function Navbar() {

    return (
        <>
            <div id="navbar">
                <BiCart />
                <RiSwordLine />
                <p>Collection</p>
            </div>
        </>
    )
}

export default Navbar;