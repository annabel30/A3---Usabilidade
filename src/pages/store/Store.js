// styles
import "./Store.css";

// json
import charactersData from "../../data/cards.json";

// react
//import React, { useState } from "react";
//import { Link } from "react-router-dom";

// react icons
//import { BiMap } from "react-icons/bi";

function Store() {

    const getOwnedCards = () => {
        return JSON.parse(localStorage.getItem("ownedCards")) || [];
    };

    const buyPack = (allCards) => {
        const coins = parseInt(localStorage.getItem("coins") || "0", 10);
        if (coins < 20) {
            alert("Moedas insuficientes!");
            return;
        }

        const owned = getOwnedCards();
        const available = allCards.filter((c) => !owned.includes(c.name));
        const pack = [];

        while (pack.length < 4 && available.length > 0) {
            const idx = Math.floor(Math.random() * available.length);
            const card = available.splice(idx, 1)[0];
            pack.push(card.name);
        }

        const newOwned = [...owned, ...pack];
        localStorage.setItem("ownedCards", JSON.stringify(newOwned));
        localStorage.setItem("coins", (coins - 20).toString());
        alert(`Você ganhou: ${pack.join(", ")}`);
    };

    return (
        <>
            <div id="store">
                <button onClick={() => buyPack(charactersData)}>
                    Comprar Pack (20 moedas)
                </button>
            </div>
        </>
    )
}

export default Store;