// styles
import "./Banner.css";

const BannerInfo = ({ children }) => {
  return (
    <div className='banner_info'>
      {children}
    </div>
  )
}

const BannerSmall = ({ children }) => {
  return (
    <div className='banner_small'>
      {children}
    </div>
  )
}

const BannerCharacterName = ({ children }) => {
  return (
    <div className='banner_character_name'>
      {children}
    </div>
  )
}

export { BannerInfo, BannerSmall, BannerCharacterName };