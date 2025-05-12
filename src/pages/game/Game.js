// styles
import "./Game.css";

// json
//import charactersData from "../../data/characters.json";

// react
import { useNavigate } from "react-router-dom";

// react icons
//import { BiMap } from "react-icons/bi";

function Game() {
  const navigate = useNavigate();

  return (
    <div id="game">
      <div className="game_return_button" onClick={() => navigate("/")}>
        <img src="/assets/icons/back.png" width={"50%"} alt="" />
      </div>
      <div className="game_">

      </div>
    </div>
  );
}

export default Game;