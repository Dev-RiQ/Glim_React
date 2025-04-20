import { React, useState } from 'react';
import '../style/header.css';
import IconButton from '../../../components/IconButton';
import { faBell, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import logoLightMode from "../../../assets/images/logo-light-mode.png";
import logoDarkMode from "../../../assets/images/logo-dark-mode.png";

function Header() {
  const [viewMode, changeMode] = useState(logoLightMode);
  function changeViewMode() {
    changeMode(viewMode === logoLightMode ? logoDarkMode : logoLightMode);
  }
  return (
    <header>
      <div className="header">
        <div className="header-left">
          <div className="logo" onClick={() => window.location.reload()}>
            <img className="logo-img" src={viewMode} alt="LOGO" />
          </div>
        </div>
        <div className="header-right">
          <IconButton icon={faBell} />
          <IconButton icon={faPaperPlane} />
        </div>
      </div>
    </header>
  )
};

export default Header;
