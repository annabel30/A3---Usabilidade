// styles
import "./Character.css";

// json
import charactersData from "../../data/cards.json";

// react
import { useNavigate, useParams } from "react-router-dom";

// react icons
//import { BiMap } from "react-icons/bi";

//components
import { BannerSmall } from "../../components/banner/Banner";
import { BannerCharacterName } from "../../components/banner/Banner";

function Character() {
  const navigate = useNavigate();

  const { name } = useParams();
  const character = charactersData.find(
    (c) => c.name.toLowerCase() === name.toLowerCase()
  );

  if (!character) {
    return <div>Personagem não encontrado.</div>;
  }

  const renderBackgroundImage = (rarity) => {
    if (rarity === "Comum") {
      return "url(/assets/backgrounds/background_character_common.jpg)";
    } else if (rarity === "Incomum") {
      return "url(/assets/backgrounds/background_character_uncommon.jpg)";
    } else if (rarity === "Raro") {
      return "url(/assets/backgrounds/background_character_rare.jpg)";
    } else if (rarity === "Épico") {
      return "url(/assets/backgrounds/background_character_epic.jpg)";
    } else if (rarity === "Lendário") {
      return "url(/assets/backgrounds/background_character_legendary.jpg)";
    }
  };

  return (
    <div
      id="character"
      style={{ backgroundImage: `${renderBackgroundImage(character.rarity)}` }}
    >
      <div className="character_box">
        <div
          className="character_button"
          onClick={() => navigate("/collection")}
        >
          <img src="/assets/icons/back.png" width={"50%"} alt="" />
        </div>
        <img
          className="character_card"
          src={character.cardImage}
          alt={character.name.toUpperCase()}
        />
        <div className="character_information">
          <BannerCharacterName>
            {character.name.toUpperCase()}
          </BannerCharacterName>
          <div className="character_attributes_box">
            <div className="character_attribute_box">
              <BannerSmall>{"INTELIGÊNCIA"}</BannerSmall>
              <div className="character_attribute">
                {character.intelligence}
              </div>
            </div>
            <div className="character_attribute_box">
              <BannerSmall>{"VELOCIDADE"}</BannerSmall>
              <div className="character_attribute">{character.velocity}</div>
            </div>
            <div className="character_attribute_box">
              <BannerSmall>{"FORÇA FÍSICA"}</BannerSmall>
              <div className="character_attribute">
                {character.physicalStrength}
              </div>
            </div>
            <div className="character_attribute_box">
              <BannerSmall>{"PODER ESPECIAL"}</BannerSmall>
              <div className="character_attribute">
                {character.specialPower}
              </div>
            </div>
          </div>
          <div className="character_info_box">
            <div className="character_text">{character.info}</div>
            <div className="character_collection_container">
              <BannerSmall>{"COLEÇÃO"}</BannerSmall>
              <div className="character_collection_box">
                <img
                  className="character_collection_image"
                  src="/assets/images/avengers.png"
                  alt="Coleção"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Character;
