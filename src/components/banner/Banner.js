// styles
import "./Banner.css";

const BannerInfo = ({ children }) => {
  return (
    <div className='banner_info'>
      {children}
    </div>
  );
};

export { BannerInfo };