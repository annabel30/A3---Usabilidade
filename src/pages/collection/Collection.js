// styles
import "./Collection.css";

// json
import charactersData from "../../data/cards.json";

// react
import { useState } from "react";
import { Link } from "react-router-dom";

// react icons
import { TbFilter } from "react-icons/tb";
//import { TbFilterOff } from "react-icons/tb";

function Collection() {
  const [filteredData, setFilteredData] = useState(
    Object.values(charactersData)
  );

  const [playerDeck, setPlayerDeck] = useState(() => {
    const savedDeck = localStorage.getItem("playerDeck");
    return savedDeck ? JSON.parse(savedDeck) : [];
  });

  const getOwnedCards = () => {
    return JSON.parse(localStorage.getItem("ownedCards")) || [];
  };

  const ownedCards = getOwnedCards();

  // Função para adicionar ou remover carta do deck
  const toggleCardInDeck = (card) => {
    const alreadyInDeck = playerDeck.find((c) => c.name === card.name);
    if (alreadyInDeck) {
      // Remove do deck
      const newDeck = playerDeck.filter((c) => c.name !== card.name);
      setPlayerDeck(newDeck);
    } else {
      // Adiciona se não ultrapassar 4 cartas
      if (playerDeck.length >= 4) {
        alert("Você só pode ter 4 cartas no deck.");
        return;
      }
      setPlayerDeck([...playerDeck, card]);
    }
  };

  // Salvar deck no localStorage
  const saveDeck = () => {
    if (playerDeck.length !== 4) {
      alert("Seu deck precisa ter exatamente 4 cartas para salvar.");
      return;
    }
    localStorage.setItem("playerDeck", JSON.stringify(playerDeck));
    alert("Deck salvo com sucesso!");
  };

  const isInDeck = (card) => playerDeck.some((c) => c.name === card.name);

  return (
    <div id="collection">
      <div className="collection_filter">
        <TbFilter width={"3rem"} height={"3rem"} />
        <img
          className="collection_filter_icon"
          src="/assets/filter/filter_brain.png"
          alt="Filter"
        />
        <img
          className="collection_filter_icon"
          src="/assets/filter/filter_sprint.png"
          alt="Filter"
        />
        <img
          className="collection_filter_icon"
          src="/assets/filter/filter_arm.png"
          alt="Filter"
        />
        <img
          className="collection_filter_icon"
          src="/assets/filter/filter_punch.png"
          alt="Filter"
        />
      </div>
      <div className="collection_container">
        {filteredData.map((item) => {
          const hasCard = ownedCards.includes(item.name);
          return (
            <div
              key={item.name}
              className={`collection_card_wrapper ${isInDeck(item) ? "selected" : ""} ${!hasCard ? "locked" : ""}`}
              onClick={() => hasCard && toggleCardInDeck(item)}
              style={{ cursor: hasCard ? "pointer" : "not-allowed", position: "relative" }}
            >
              <img
                className="collection_card"
                src={item.cardImage}
                alt={item.name}
                title={item.name}
                style={{ filter: hasCard ? "none" : "grayscale(100%) brightness(0.5)" }}
              />
              {hasCard ? (
                <Link to={`/character/${item.name}`}>
                  <button
                    className="collection_plus_button"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>+</span>
                  </button>
                </Link>
              ) : (
                <a href="#" onClick={(e) => e.preventDefault()}>
                  {/* sem botão se não tiver carta */}
                </a>
              )}
            </div>
          );
        })}
      </div>
      <div className="collection_deck">
        <div className="collecton_box">
          {playerDeck.length === 0 && (
            <p>Seu deck está vazio. Clique nas cartas acima para adicionar.</p>
          )}
          {playerDeck.map((card) => (
            <img
              key={card.name}
              className="collection_deck_card"
              src={card.cardImage}
              alt={card.name}
              title={card.name}
              style={{ cursor: "pointer" }}
              onClick={() => toggleCardInDeck(card)}
            />
          ))}
        </div>
      </div>
      <div
        className="collection_button"
        onClick={saveDeck}
        style={{ cursor: "pointer" }}
      >
        SALVAR DECK
      </div>
    </div>
  );
}

export default Collection;
