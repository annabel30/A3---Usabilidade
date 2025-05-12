// styles
import "./Collection.css";

// json
import charactersData from "../../data/cards.json";

// react
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// react icons
import { TbFilter } from "react-icons/tb";
//import { TbFilterOff } from "react-icons/tb";

function Collection() {
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState(
    Object.values(charactersData)
  );

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
        {filteredData.map((item) => (
          <Link
            to={`/character/${item.name}`}
            key={item.name}
          >
            <img
              className="collection_card"
              src={item.cardImage}
              alt={item.name}
            />
          </Link>
        ))}
      </div>
      <div className="collection_deck">
        <div className="collecton_box">
          <img
            className="collection_deck_card"
            src="/assets/cards/thanos.png"
            alt=""
          />
          <img
            className="collection_deck_card"
            src="/assets/cards/thanos.png"
            alt=""
          />
          <img
            className="collection_deck_card"
            src="/assets/cards/thanos.png"
            alt=""
          />
          <img
            className="collection_deck_card"
            src="/assets/cards/thanos.png"
            alt=""
          />
        </div>
      </div>
      <div className="collection_button">SALVAR DECK</div>
    </div>
  );
}

export default Collection;
