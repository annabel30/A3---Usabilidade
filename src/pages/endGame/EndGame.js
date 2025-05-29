import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./EndGame.css";

function EndGame() {
  const location = useLocation();
  const navigate = useNavigate();
  const { playerScore = 0, opponentScore = 0 } = location.state || {};

  const getResultMessage = () => {
    if (playerScore > opponentScore) return "Você venceu!";
    if (playerScore < opponentScore) return "Você perdeu!";
    return "Empate!";
  };

  return (
    <div id="endgame">
      <h1>{getResultMessage()}</h1>
      <p>Placar final:</p>
      <p>Você: {playerScore}</p>
      <p>Oponente: {opponentScore}</p>
      <button onClick={() => navigate("/")}>Voltar ao Início</button>
    </div>
  );
}

export default EndGame;
