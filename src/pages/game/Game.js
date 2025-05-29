// styles
import "./Game.css";

// json
import cardsData from "../../data/cards.json";

// react
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// components
import { Modal, SideModal } from "../../components/modal/Modal";
import { BannerInfo } from "../../components/banner/Banner";

function Game() {
  const navigate = useNavigate();

  // cards do json
  const [cardsSet] = useState(Object.values(cardsData));

  // card decks
  const [listCardsPlayer, setListCardsPlayer] = useState([]);
  const [listCardsOpponent, setListCardsOpponent] = useState([]);

  // numbers
  const [totalCards] = useState(4);
  // const [startedRound, setStartedRound] = useState(
  //   Math.floor(Math.random() * 2)
  // );
  const [startedRound, setStartedRound] = useState(0);

  // booleans
  const [showModalInstructions, setShowModalInstructions] = useState(false);
  const [showModalAttibutes, setShowModalAttibutes] = useState(false);
  const [showSmallModalAttibutes, setShowSmallodalAttibutes] = useState(false);

  // text consts
  const [modalText, setModalText] = useState("");
  const [selectedAttribute, setSelectedAttribute] = useState("");

  // lists
  const attributes = [
    "INTELIGÊNCIA",
    "VELOCIDADE",
    "FORÇA FÍSICA",
    "PODER ESPECIAL",
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
  const [attributeChosen, setAttributeChosen] = useState("");
  const [userAttributeValue, setUserAttributeValue] = useState();
  const [opponentAttributeValue, setOpponentAttributeValue] = useState();

  const [roundResults, setRoundResults] = useState(Array(9).fill(null));

  useEffect(() => {
    // Tentar carregar deck salvo do localStorage
    const savedDeck = localStorage.getItem("playerDeck");
    if (savedDeck) {
      // Se tiver deck salvo, parse e usa
      const playerDeckFromStorage = JSON.parse(savedDeck);

      // Para o oponente, embaralha normalmente e pega 4 cartas diferentes
      let opponentDeck = [...cardsSet];
      opponentDeck = opponentDeck.filter(
        (card) => !playerDeckFromStorage.some((c) => c.name === card.name)
      );
      opponentDeck.sort(() => Math.random() - 0.5);
      opponentDeck = opponentDeck.slice(0, totalCards);

      setListCardsPlayer(playerDeckFromStorage);
      setListCardsOpponent(opponentDeck);

      setModalText(
        startedRound === 0
          ? "VOCÊ INICIA A BATALHA."
          : "O OPONENTE INICIA A BATALHA."
      );

      setShowModalInstructions(true);
      playRound();
    } else {
      initializeCards();
    }
  }, [totalCards]);

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

    setModalText(
      startedRound === 0
        ? "VOCÊ INICIA A BATALHA."
        : "O OPONENTE INICIA A BATALHA."
    );

    setShowModalInstructions(true);
    playRound();
  };

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
    setShowSmallodalAttibutes(false);
    shiftCardsRound(); // só isso aqui
    playRound();
  };

  const compareAttributes = (chosenAtt) => {
    setShowModalInstructions(false);
    setShowModalAttibutes(false);

    const playerCard = listCardsPlayer[0];
    const opponentCard = listCardsOpponent[0];

    const attributeKey = attributesJSON[chosenAtt];
    const attributeName = attributes[chosenAtt];
    const attributeUserValue = playerCard?.[attributeKey] ?? 0;
    const attributeComputerValue = opponentCard?.[attributeKey] ?? 0;

    console.log(
      playerCard,
      attributeName,
      attributeUserValue,
      attributeComputerValue
    );

    setAttributeChosen(attributeName);
    setUserAttributeValue(attributeUserValue);
    setOpponentAttributeValue(attributeComputerValue);

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

    setTimeout(() => {
      handleRoundResult(winner);
    }, 4000);

    setShowSmallodalAttibutes(true);
  };

  const handleRoundResult = (winner) => {
    if (winner === "player") {
      setPlayerScore((score) => score + 1);
    } else if (winner === "computer") {
      setOpponentScore((score) => score + 1);
    }

    setRoundResults((prev) => {
      const next = [...prev];
      const index = next.findIndex((r) => r === null);
      if (index !== -1) next[index] = winner;

      const isGameOver = next.filter((r) => r !== null).length === 9;
      if (isGameOver) {
        setTimeout(() => {
          navigate("/end", {
            state: {
              playerScore: winner === "player" ? playerScore + 1 : playerScore,
              opponentScore:
                winner === "computer" ? opponentScore + 1 : opponentScore,
            },
          });
        }, 1000);
      }

      return next;
    });

    shiftCardsRound();
  };

  const shiftCardsRound = () => {
    const newDeckPlayer = [...listCardsPlayer.slice(1), listCardsPlayer[0]];
    const newDeckOpponent = [
      ...listCardsOpponent.slice(1),
      listCardsOpponent[0],
    ];

    setListCardsPlayer(newDeckPlayer);
    setListCardsOpponent(newDeckOpponent);
  };

  const gameOver = () => {
    navigate("/");
  };

  return (
    <div id="game">
      <div className="game_give_up_button" onClick={gameOver}>
        <img src="/assets/icons/back.png" width={"50%"} alt="" />
      </div>
      <div className="game_rounds_subtitles">RODADAS</div>
      <div className="game_sidebar_scoreboard">
        {roundResults.map((result, index) => (
          <div
            key={index}
            className={`score_square ${
              result === "player"
                ? "score_square_green"
                : result === "computer"
                ? "score_square_red"
                : "score_square_neutral"
            }`}
          />
        ))}
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
        {showModalInstructions && (
          <Modal>
            <p className="game_modal_instructions">{modalText}</p>
          </Modal>
        )}

        {showSmallModalAttibutes && (
          <>
            <div className="game_opponent_card_text">OPONENTE</div>
            <img
              className="game_opponent_cardfront"
              src={listCardsOpponent[0]?.cardImage}
              alt={listCardsOpponent[0]?.name}
            />
            <div className="game_player_card_text">SUA CARTA</div>
            <img
              className="game_player_cardfront"
              src={listCardsPlayer[0]?.cardImage}
              alt={listCardsPlayer[0]?.name}
            />
            <SideModal>
              <BannerInfo>{"ATRIBUTO ESCOLHIDO:"}</BannerInfo>
              <div className="game_modal_attributes">
                <p>{attributeChosen}</p>
                <div className="game_modal_box">
                  <div className="game_modal_line">
                    <p>VOCÊ:</p>
                    <p>{userAttributeValue}</p>
                  </div>
                  <div className="game_modal_line">
                    <p>OPONENTE:</p>
                    <p>{opponentAttributeValue}</p>
                  </div>
                </div>
                <p>{modalText}</p>
                <button onClick={nextRound} className="game_modal_attribute">
                  PRÓXIMA RODADA
                </button>
              </div>
            </SideModal>
          </>
        )}

        {showModalAttibutes && (
          <>
            <img
              className="game_player_cardback"
              src={listCardsPlayer[0]?.cardImage}
              alt={listCardsPlayer[0]?.name}
            />
            <SideModal>
              <BannerInfo>{"ESCOLHA UM ATRIBUTO..."}</BannerInfo>
              <div className="game_modal_attributes_options">
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
                  <p className="game_modal_text">
                    CLIQUE NOVAMENTE PARA CONFIRMAR!
                  </p>
                )}
              </div>
            </SideModal>
          </>
        )}
      </div>
    </div>
  );
}

export default Game;
