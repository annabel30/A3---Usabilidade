// styles
import "./Store.css";

// json
import charactersData from "../../data/cards.json";

// react
import { useState } from "react";
import { Modal } from "../../components/modal/Modal";

function Store() {
  const [packResult, setPackResult] = useState([]);
  const getOwnedCards = () => {
    return JSON.parse(localStorage.getItem("ownedCards")) || [];
  };

  const buyPack = (allCards, price) => {
    const coins = parseInt(localStorage.getItem("coins") || "0", 10);
    if (coins < price) {
      alert("Moedas insuficientes!");
      return;
    }

    const owned = getOwnedCards();
    const pack = [];

    while (pack.length < 4) {
      const idx = Math.floor(Math.random() * allCards.length);
      const card = allCards[idx];
      pack.push(card);
    }

    const newOwnedSet = new Set([...owned, ...pack.map((c) => c.name)]);
    localStorage.setItem("ownedCards", JSON.stringify(Array.from(newOwnedSet)));
    localStorage.setItem("coins", (coins - price).toString());

    setPackResult(pack);
  };

  const cardPacks = [
    { name: "VELOCIDADE", price: 40, image: "/assets/packs/pack_8.png" },
    { name: "ÉPICO", price: 60, image: "/assets/packs/pack_9.png" },
    { name: "INTELIGENCIA", price: 40, image: "/assets/packs/pack_5.png" },
    { name: "LENDÁRIO", price: 80, image: "/assets/packs/pack_6.png" },
    { name: "BÁSICO", price: 30, image: "/assets/packs/pack_7.png" },
    { name: "PODER ESPECIAL", price: 40, image: "/assets/packs/pack_3.png" },
    { name: "AVANÇADO", price: 50, image: "/assets/packs/pack_4.png" },
    { name: "FORÇA FÍSICA", price: 40, image: "/assets/packs/pack_1.png" },
    { name: "PADRÃO", price: 40, image: "/assets/packs/pack_2.png" },
  ];

  return (
    <>
      <div id="store">
        <div className="store_pack_grid">
          {cardPacks.map((pack) => (
            <div key={pack.name} className="store_pack_card">
              <div className="store_pack_info">{pack.name}</div>
              <div className="store_pack_info2">
                {pack.price}
                <img
                  alt="Moeda"
                  width="15px"
                  height="15px"
                  src="/assets/icons/coin.png"
                />
              </div>
              <img
                src={pack.image}
                alt={pack.name}
                className="store_pack_image"
              />
              <button onClick={() => buyPack(charactersData, pack.price)}>
                COMPRAR
              </button>
            </div>
          ))}
        </div>
        {packResult.length > 0 && (
          <Modal>
            <p>VOCÊ RECEBEU:</p>
            <div className="store_cards_box">
              {packResult.map((card) => (
                <img
                  key={card.name}
                  src={card.cardImage}
                  alt={card.name}
                  title={card.name}
                  className="store_pack_cards"
                />
              ))}
            </div>
            <button
              className="store_pack_button"
              onClick={() => setPackResult([])}
            >
              CONFIRMAR
            </button>
          </Modal>
        )}
      </div>
    </>
  );
}

export default Store;
