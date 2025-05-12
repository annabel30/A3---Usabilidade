// styles
import "./Character.css";

// json
//import charactersData from "../../data/characters.json";

// react
import { useNavigate } from "react-router-dom";

// react icons
//import { BiMap } from "react-icons/bi";

//components
import { BannerSmall } from "../../components/banner/Banner";
import { BannerCharacterName } from "../../components/banner/Banner";

function Character() {
  const navigate = useNavigate();

  return (
    <div id="character">
      <div className="character_box">
        <div
          className="character_button"
          onClick={() => navigate("/collection")}
        >
          <img src="/assets/icons/back.png" width={"50%"} alt="" />
        </div>
        <img className="character_card" src="/assets/cards/thanos.png" alt="" />
        <div className="character_information">
          <BannerCharacterName>{"THANOS"}</BannerCharacterName>
          <div className="character_attributes_box">
            <div className="character_attribute_box">
              <BannerSmall>{"INTELIGÊNCIA"}</BannerSmall>
              <div className="character_attribute">10</div>
            </div>
            <div className="character_attribute_box">
              <BannerSmall>{"VELOCIDADE"}</BannerSmall>
              <div className="character_attribute">1</div>
            </div>
            <div className="character_attribute_box">
              <BannerSmall>{"FORÇA FÍSICA"}</BannerSmall>
              <div className="character_attribute">3</div>
            </div>
            <div className="character_attribute_box">
              <BannerSmall>{"PODER ESPECIAL"}</BannerSmall>
              <div className="character_attribute">3</div>
            </div>
          </div>
          <div className="character_info_box">
            <div className="character_text">
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC.
            </div>
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
