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

export { BannerInfo, BannerSmall };