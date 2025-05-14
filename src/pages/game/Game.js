// styles
import "./Game.css"

// json
import cardsData from "../../data/cards.json";

// react
import { useNavigate } from "react-router-dom"
import React, { useState, useEffect } from 'react'

// react icons
//import { BiMap } from "react-icons/bi";

// components
import { Modal } from '../../components/modal/Modal'

function Game() {

  const navigate = useNavigate()

  // cards do json
  const [cardsSet] = useState(Object.values(cardsData))

  // card decks
  const [listCardsPlayer, setListCardsPlayer] = useState([])
  const [listCardsOpponent, setListCardsOpponent] = useState([])

  // model cards
  const [playerCardModel, setPlayerCardModel] = useState()
  const [opponentCardModel, setOpponentCardModel] = useState()

  // numbers
  const [totalCards, setTotalCards] = useState(10);
  const [startedRound, setStartedRound] = useState(Math.floor(Math.random() * 2))

  // booleans
  const [startGame, setStartGame] = useState(false)
  const [isButtonHidden, setIsButtonHidden] = useState(false)
  const [comparingCards, setComparingCards] = useState(false)

  const [showModalInstructions, setShowModalInstructions] = useState(false)
  const [showModalAttibutes, setShowModalAttibutes] = useState(false)
  const [showSmallModalAttibutes, setShowSmallodalAttibutes] = useState(false)

  // text consts
  const [smallModalText, setSmallModalText] = useState("")
  const [modalText, setModalText] = useState("")
  const [selectedAttribute, setSelectedAttribute] = useState("")

  // lists
  // const scorePerCards = { 3: 10, 6: 30, 10: 50, 14: 100 }
  const attributes = ["Inteligência", "Velocidade", "Força Física", "Poder Especial"]
  const attributesJSON = ["intelligence", "velocity", "physicalStrength", "specialPower"]

  // ----------------------------- OK
  useEffect(() => {
    const playerDeck = cardsSet.slice(0, 4)
    const opponentDeck = cardsSet.slice(4, 8)

    setListCardsPlayer(playerDeck)
    setListCardsOpponent(opponentDeck)
    setPlayerCardModel(playerDeck[0])
    setOpponentCardModel(opponentDeck[0])
    setStartGame(true)
  }, [])

  useEffect(() => {
    if (!startGame) return;

    if (startedRound === 0) {
      setModalText("VEZ JOGADOR")
      // setShowModalAttributes(true);
    } else {
      setModalText("VEZ DO OPONENTE")
      // setShowModalAttributes(false);
      setTimeout(() => {
        const randomAttributeIndex = Math.floor(Math.random() * attributes.length);
        compareAttributes(randomAttributeIndex);
      }, 2000);
    }
  }, [startedRound, startGame]);

  useEffect(() => {
    checkGameStatus()
  }, [listCardsOpponent, listCardsPlayer])

  useEffect(() => {
    playRound()
  }, [playerCardModel, opponentCardModel])

  const checkGameStatus = () => {
    if (startGame) {
      if (listCardsOpponent.length === 0) {
        handleEndGame('Parabéns! Você ganhou o jogo!')
      } else if (listCardsPlayer.length === 0) {
        handleEndGame('Que pena! Você perdeu o jogo!')
      }
    }
  }

  const handleEndGame = (message) => {
    setSmallModalText(true)
    setModalText(message)
    setShowModalAttibutes(false)
    setSmallModalText(false)
    // saveScore()
    setTimeout(() => {
      gameOver()
    }, 3000)
  }

  // const handleTotalCardsChosen = (chosenTotalCards) => {
  //   setTotalCards(chosenTotalCards);
  // }

  // function saveScore() {
  //   let playerName = localStorage.getItem('playerName')
  //   let score = scorePerCards[totalCards] || 0

  //   const playerScores = JSON.parse(localStorage.getItem('playerScores')) || []
  //   const existingPlayerIndex = playerScores.findIndex((player) => player.name === playerName)

  //   if (existingPlayerIndex === -1) {
  //     playerScores.push({ name: playerName, score })
  //   } else {
  //     if (score > playerScores[existingPlayerIndex].score) {
  //       playerScores[existingPlayerIndex].score = score
  //     }
  //   }
  //   playerScores.sort((a, b) => b.score - a.score)
  //   localStorage.setItem('playerScores', JSON.stringify(playerScores))
  // }

  // const playMatch = () => {
  //   setStartGame(true)
  //   setShowModalInstructions(true)
  //   playRound()
  // }

  const gameOver = () => {
    navigate("/")
  }

  const playRound = () => {
    setShowModalInstructions(true)
    setComparingCards(false)
    setPlayerCardModel(listCardsPlayer[0])
    setOpponentCardModel(listCardsOpponent[0])

    // if (startedRound === 0) {

    //   setStartedRound(1)
    //   setTimeout(() => {
    //     setShowModalInstructions(true)
    //     setModalText("Your turn to choose!")
    //   }, 2000)
    //   setTimeout(() => {
    //     setShowModalInstructions(false)
    //     setSelectedAttribute("")
    //     setShowModalAttibutes(true)
    //   }, 4000)
    // } else {

    //   setStartedRound(0)
    //   setTimeout(() => {
    //     setShowModalInstructions(true)
    //     setModalText("Opponent's turn to choose!")
    //   }, 2000)
    //   setTimeout(() => {
    //     const randomAttribute = Math.floor(Math.random() * attributes.length);
    //     compareAttributes(randomAttribute)
    //   }, 4000)
    // }
  }

  // const nextRound = () => {
  //   setIsButtonHidden(true)
  //   playRound()
  // }

  const compareAttributes = (chosenAtt) => {
    setShowModalInstructions(false)
    setShowModalAttibutes(false)
    setPlayerCardModel(listCardsPlayer[0])
    setOpponentCardModel(listCardsOpponent[0])

    const attributeChosen = attributesJSON[chosenAtt];
    const attributeUserValue = listCardsPlayer[0][attributeChosen];
    const attributeComputerValue = listCardsOpponent[0][attributeChosen];

    setComparingCards(true)
    setSmallModalText(
      `Attribute: ${attributes[chosenAtt]}. 
      VOCÊ: ${attributeUserValue}. 
      OPONENTE: ${attributeComputerValue}.`
    );
    setShowSmallodalAttibutes(true);

    setTimeout(() => {
      if (attributeUserValue > attributeComputerValue) {
        setModalText("You won this round!");
        playerWonRound();
      } else if (attributeUserValue < attributeComputerValue) {
        setModalText("You lost this round!");
        computerWonRound();
      } else {
        setModalText("The round ended in a draw!");
        // tieRound();
      }

      setShowSmallodalAttibutes(false);
      setShowModalInstructions(true);
      setIsButtonHidden(false);
    }, 4000);
  }

  const computerWonRound = () => {
    setTimeout(() => {
      setPlayerCardModel(listCardsPlayer[0])
      setOpponentCardModel(listCardsOpponent[0])
    }, 0)
  }

  const playerWonRound = () => {
    setTimeout(() => {
      setPlayerCardModel(listCardsPlayer[0])
      setOpponentCardModel(listCardsOpponent[0])
    }, 0)
  }

  const tieRound = () => {
    setListCardsPlayer((prev) => {
      const firstCard = prev[0];
      const newDeck = [...prev.slice(1), firstCard];
      setPlayerCardModel(newDeck[0]);
      return newDeck;
    });

    setListCardsOpponent((prev) => {
      const firstCard = prev[0];
      const newDeck = [...prev.slice(1), firstCard];
      setOpponentCardModel(newDeck[0]);
      return newDeck;
    });
  };

  // const tieRound = () => {
  //   removeComputerDeck()
  //   setListCardsOpponent((prevDeck) => prevDeck.slice(1))
  //   addComputerDeck(listCardsOpponent[0])
  //   removeUserDeck()
  //   addUserDeck(listCardsPlayer[0])
  //   setTimeout(() => {
  //     setPlayerCardModel(listCardsPlayer[0])
  //     setOpponentCardModel(listCardsOpponent[0])
  //   }, 0)
  // }

  // const addUserDeck = (card) => {
  //   setListCardsPlayer((prevDeck) => [...prevDeck, card])
  // }
  // const addComputerDeck = (card) => {
  //   setListCardsOpponent((prevDeck) => [...prevDeck, card])
  // }

  // const removeUserDeck = () => {
  //   setListCardsPlayer((prevDeck) => prevDeck.slice(1))
  // }
  // const removeComputerDeck = () => {
  //   setListCardsOpponent((prevDeck) => prevDeck.slice(1))
  // }

  return (
    <div id="game">
      <div className="game_give_up_button" onClick={gameOver}>
        <img src="/assets/icons/back.png" width={"50%"} alt="" />
      </div>
      <div className='game_page'>
        <img className='game_opponent_cardback' src="/assets/backgrounds/card_back.jpg" alt='' />
        <img className='game_player_cardback' src="/assets/backgrounds/card_back.jpg" alt='' />

        {showModalInstructions && modalText === 'VEZ JOGADOR' && (
          <Modal>
            <p className='game_modal_instructions'>SUA VEZ.</p>
            <p className='game_modal_instructions'>ESCOLHA SEUS ATRIBUTOS SABIAMENTE.</p>
          </Modal>
        )}
        {showModalInstructions && modalText === 'VEZ OPONENTE' && (
          <Modal>
            <p className='game_modal_instructions'>VEZ DO OPONENTE.</p>
            <p className='game_modal_instructions'>OPONENTE ESCOLHENDO ATRIBUTOS...</p>
          </Modal>
        )}

        {showModalInstructions && (
          modalText !== 'You won this round!' &&
          modalText !== 'You lost this round!' &&
          modalText !== 'The round ended in a draw!') && (
            // <ModalWithStars>
            //   <p className='game_modal_instructions'>{modalText}</p>
            // </ModalWithStars>
            <p>a</p>
          )}

        {showModalInstructions && (
          modalText === 'You won this round!' ||
          modalText === 'You lost this round!' ||
          modalText === 'The round ended in a draw!') && (
            // <ModalWithoutStars>
            //   <p className='game_modal_instructions'>{modalText}</p>
            //   {isButtonHidden ? null : (
            //     <button className='game_button_design' onClick={nextRound}>
            //       <div className='game_button_design_inline'>
            //         Next round
            //       </div>
            //     </button>
            //   )}
            // </ModalWithoutStars>
            <p>a</p>
          )}

        {showSmallModalAttibutes && (
          // <SmallModal>
          //   <p>{smallModalText}</p>
          // </SmallModal>
          <p>a</p>
        )}

        {showModalAttibutes && (
          // <Modal>
          //   <CharacterCard character={playerCardModel} />
          //   <div className="game_modal_attributes">
          //     <p className='game_modal_text'>This is your card, choose an attribute to battle!</p>
          //     {attributes.map((attribute, index) => (
          //       <button
          //         onClick={selectedAttribute === attribute
          //           ? (() => compareAttributes(index))
          //           : (() => setSelectedAttribute(attribute))}
          //         className={selectedAttribute === attribute
          //           ? 'game_modal_attribute_selected'
          //           : 'game_modal_attribute'}
          //         key={index} value={attribute}>
          //         <div className='game_modal_attribute_button_inline'>{attribute}</div>
          //       </button>
          //     ))}
          //     {selectedAttribute !== "" && <p className='game_modal_text'>Click again to confirm!</p>}
          //   </div>
          // </Modal>
          <p>a</p>
        )}
        {/* {comparingCards ? (
          <div className='comparing_box'>
            <div className='game_card_flip lalala'>
              <img
                className="collection_card"
                src={playerCardModel.cardImage}
                alt={playerCardModel.name}
              />
            </div>
            <div className='game_card_flip lalala'>
              <img
                className="collection_card"
                src={opponentCardModel.cardImage}
                alt={opponentCardModel.name}
              />
            </div>
          </div>
        ) : (
          <div className='game_card_flip'>
            <img
              className="collection_card"
              src={playerCardModel.cardImage}
              alt={playerCardModel.name}
            />
          </div>
        )} */}
      </div>
    </div>
  );
}

export default Game;