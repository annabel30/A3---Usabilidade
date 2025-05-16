// styles
import "./Game.css";

// json
import cardsData from "../../data/cards.json";

// react
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

// react icons
//import { BiMap } from "react-icons/bi";

// components
import { Modal } from "../../components/modal/Modal";

function Game() {
  const navigate = useNavigate();

  // cards do json
  const [cardsSet] = useState(Object.values(cardsData));

  // card decks
  const [listCardsPlayer, setListCardsPlayer] = useState([]);
  const [listCardsOpponent, setListCardsOpponent] = useState([]);

  // model cards
  const [playerCardModel, setPlayerCardModel] = useState();
  const [opponentCardModel, setOpponentCardModel] = useState();

  // numbers
  const [totalCards] = useState(10);
  const [startedRound, setStartedRound] = useState(
    Math.floor(Math.random() * 2)
  );

  // booleans
  const [startGame, setStartGame] = useState(false);
  const [isButtonHidden, setIsButtonHidden] = useState(false);
  const [comparingCards, setComparingCards] = useState(false);

  const [showModalInstructions, setShowModalInstructions] = useState(false);
  const [showModalAttibutes, setShowModalAttibutes] = useState(false);
  const [showSmallModalAttibutes, setShowSmallodalAttibutes] = useState(false);

  // text consts
  const [smallModalText, setSmallModalText] = useState("");
  const [modalText, setModalText] = useState("");
  const [selectedAttribute, setSelectedAttribute] = useState("");

  // lists
  const scorePerCards = { 3: 10, 6: 30, 10: 50, 14: 100 };
  const attributes = [
    "Inteligência",
    "Velocidade",
    "Força Física",
    "Poder Especial",
  ];
  const attributesJSON = [
    "intelligence",
    "velocity",
    "physicalStrength",
    "specialPower",
  ];

  // variables
  const [playerScore, setPlayerScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);

  useEffect(() => {
    initializeCards();
  }, [totalCards]);

  // useEffect(() => {
  //   checkGameStatus();
  // }, [listCardsOpponent, listCardsPlayer]);

  useEffect(() => {
    if (
      startGame &&
      listCardsPlayer.length > 0 &&
      listCardsOpponent.length > 0
    ) {
      playRound();
    }
  }, [startGame, listCardsPlayer, listCardsOpponent]);

  const initializeCards = () => {
    let deckCards = [...cardsSet];
    deckCards.sort(() => Math.random() - 0.5);

    const playerDeck = [];
    const opponentDeck = [];

    for (let i = 0; i < totalCards * 2; i++) {
      i % 2 === 0
        ? playerDeck.push(deckCards[i])
        : opponentDeck.push(deckCards[i]);
    }

    setListCardsPlayer(playerDeck);
    setListCardsOpponent(opponentDeck);
    setPlayerCardModel(deckCards[0]);
    setOpponentCardModel(deckCards[1]);

    setModalText(
      startedRound === 0
        ? "VOCÊ INICIA A BATALHA."
        : "O OPONENTE INICIA A BATALHA."
    );

    setStartGame(true);
    setShowModalInstructions(true);
  };

  // const checkGameStatus = () => {
  //   if (startGame) {
  //     if (listCardsOpponent.length === 0) {
  //       handleEndGame("Parabéns! Você ganhou o jogo!");
  //     } else if (listCardsPlayer.length === 0) {
  //       handleEndGame("Que pena! Você perdeu o jogo!");
  //     }
  //   }
  // };

  // const handleEndGame = (message) => {
  //   // setSmallModalText(true);
  //   setModalText(message);
  //   setShowModalAttibutes(false);
  //   // setSmallModalText(false);
  //   saveScore();
  //   setTimeout(() => {
  //     gameOver();
  //   }, 3000);
  // };

  // function saveScore() {
  //   let playerName = localStorage.getItem("playerName");
  //   let score = scorePerCards[totalCards] || 0;

  //   const playerScores = JSON.parse(localStorage.getItem("playerScores")) || [];
  //   const existingPlayerIndex = playerScores.findIndex(
  //     (player) => player.name === playerName
  //   );

  //   if (existingPlayerIndex === -1) {
  //     playerScores.push({ name: playerName, score });
  //   } else {
  //     if (score > playerScores[existingPlayerIndex].score) {
  //       playerScores[existingPlayerIndex].score = score;
  //     }
  //   }
  //   playerScores.sort((a, b) => b.score - a.score);
  //   localStorage.setItem("playerScores", JSON.stringify(playerScores));
  // }

  const playRound = () => {
    setShowModalInstructions(true);
    setComparingCards(false);
    setPlayerCardModel(listCardsPlayer[0]);
    setOpponentCardModel(listCardsOpponent[0]);

    if (startedRound === 0) {
      setStartedRound(1);
      setTimeout(() => {
        setShowModalInstructions(true);
        setModalText("SUA VEZ");
      }, 2000);
      setTimeout(() => {
        setShowModalInstructions(false);
        setSelectedAttribute("");
        setShowModalAttibutes(true);
      }, 4000);
    } else {
      setStartedRound(0);
      setTimeout(() => {
        setShowModalInstructions(true);
        setModalText("VEZ DO OPONENTE");
      }, 2000);
      setTimeout(() => {
        const randomAttribute = Math.floor(Math.random() * attributes.length);
        compareAttributes(randomAttribute);
      }, 4000);
    }
  };

  const nextRound = () => {
    setIsButtonHidden(true);
    playRound();
  };

  const compareAttributes = (chosenAtt) => {
    setShowModalInstructions(false);
    setShowModalAttibutes(false);
    setPlayerCardModel(listCardsPlayer[0]);
    setOpponentCardModel(listCardsOpponent[0]);

    const attributeChosen = attributesJSON[chosenAtt];
    const attributeUserValue = listCardsPlayer[0]?.[attributeChosen] ?? 0;
    const attributeComputerValue = listCardsOpponent[0]?.[attributeChosen] ?? 0;

    setComparingCards(true);
    setSmallModalText(
      `Attribute: ${attributes[chosenAtt]}. Yours: ${attributeUserValue}. Opponent's: ${attributeComputerValue}.`
    );
    setShowSmallodalAttibutes(true);

    setTimeout(() => {
      let winner = null;

      if (attributeUserValue > attributeComputerValue) {
        winner = "player";
        setModalText("VOCÊ GANHOU A RODADA!");
      } else if (attributeUserValue < attributeComputerValue) {
        winner = "computer";
        setModalText("VOCÊ PERDEU A RODADA!");
      } else {
        setModalText("EMPATE!");
      }

      handleRoundResult(winner);

      setShowSmallodalAttibutes(false);
      setShowModalInstructions(true);
      setIsButtonHidden(false);
    }, 4000);
  };

  const handleRoundResult = (winner) => {
    if (winner === "player") {
      setPlayerScore((score) => score + 1);
    } else if (winner === "computer") {
      setOpponentScore((score) => score + 1);
    }
    shiftCardsRound();
  };

  const shiftCardsRound = () => {
    setListCardsPlayer((prevDeck) => {
      if (prevDeck.length <= 1) return prevDeck;
      return [...prevDeck.slice(1), prevDeck[0]];
    });

    setListCardsOpponent((prevDeck) => {
      if (prevDeck.length <= 1) return prevDeck;
      return [...prevDeck.slice(1), prevDeck[0]];
    });
    setTimeout(() => {
      setPlayerCardModel(listCardsPlayer[0]);
      setOpponentCardModel(listCardsOpponent[0]);
    }, 0);
  };

  const gameOver = () => {
    navigate("/");
  };

  return (
    <div id="game">
      <div className="game_give_up_button" onClick={gameOver}>
        <img src="/assets/icons/back.png" width={"50%"} alt="" />
      </div>
      <div className="game_page">
        <img
          className="game_opponent_cardback"
          src="/assets/backgrounds/card_back.jpg"
          alt=""
        />
        <img
          className="game_player_cardback"
          src="/assets/backgrounds/card_back.jpg"
          alt=""
        />
        {showModalInstructions &&
          modalText !== "You won this round!" &&
          modalText !== "You lost this round!" &&
          modalText !== "The round ended in a draw!" && (
            <Modal>
              <p className="game_modal_instructions">{modalText}</p>
            </Modal>
          )}
        {showModalInstructions &&
          (modalText === "You won this round!" ||
            modalText === "You lost this round!" ||
            modalText === "The round ended in a draw!") && (
            <Modal>
              <p className="game_modal_instructions">{modalText}</p>
              {isButtonHidden ? null : (
                <button className="game_button_design" onClick={nextRound}>
                  <div className="game_button_design_inline">Next round</div>
                </button>
              )}
            </Modal>
          )}

        {showSmallModalAttibutes && (
          <Modal>
            <p>{smallModalText}</p>
          </Modal>
        )}

        {showModalAttibutes && (
          <Modal>
            <img
              className="collection_card"
              src={playerCardModel.cardImage}
              alt={playerCardModel.name}
            />
            <div className="game_modal_attributes">
              <p className="game_modal_text">
                This is your card, choose an attribute to battle!
              </p>
              {attributes.map((attribute, index) => (
                <button
                  onClick={
                    selectedAttribute === attribute
                      ? () => compareAttributes(index)
                      : () => setSelectedAttribute(attribute)
                  }
                  className={
                    selectedAttribute === attribute
                      ? "game_modal_attribute_selected"
                      : "game_modal_attribute"
                  }
                  key={index}
                  value={attribute}
                >
                  <div className="game_modal_attribute_button_inline">
                    {attribute}
                  </div>
                </button>
              ))}
              {selectedAttribute !== "" && (
                <p className="game_modal_text">Click again to confirm!</p>
              )}
            </div>
          </Modal>
        )}
        {comparingCards ? (
          <div className="comparing_box">
            <div className="game_card_flip lalala">
              {playerCardModel && (
                <img
                  className="collection_card"
                  src={playerCardModel.cardImage}
                  alt={playerCardModel.name}
                />
              )}
            </div>
            <div className="game_card_flip lalala">
              {opponentCardModel && (
                <img
                  className="collection_card"
                  src={opponentCardModel.cardImage}
                  alt={opponentCardModel.name}
                />
              )}
            </div>
          </div>
        ) : (
          <div className="game_card_flip">
            {playerCardModel && (
              <img
                className="collection_card"
                src={playerCardModel.cardImage}
                alt={playerCardModel.name}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Game;
