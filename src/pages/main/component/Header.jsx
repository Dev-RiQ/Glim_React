import { React, useEffect, useState } from 'react';
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

  const [header, setHeader] = useState(null);
  const [modal, setModal] = useState(false);
  const uri = window.location.pathname;

  useEffect(() => {
    let footerIcon = [];
    footerIcon = [...footerIcon, getButton(faBell, '/alarm')];
    footerIcon = [...footerIcon, getButton(faPaperPlane, '/chat', uri === '/chat' ? true : '')];
    setHeader(footerIcon);
  }, [modal])

  function buttonEvent(link) {
    if (link === '/alarm') {
      console.log(modal)
      setModal(!modal);
      return;
    }
    link !== uri ? window.location.href = link : scrollToTop();
  }

  function scrollToTop(e) {
    if (e && e.target.className !== 'header') return;
    document.querySelector('section').scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  function getButton(type, link, checked) {
    return (<div className="icon-box" key={link} onClick={() => buttonEvent(link)}>
      <IconButton icon={type} check={checked ? checked : ''} />
    </ div>)
  }

  return (
    <header>
      <div className="header" onClick={e => scrollToTop(e)}>
        <div className="header-left">
          <div className="logo" onClick={() => window.location.href = "/"}>
            <img className="logo-img" src={viewMode} alt="LOGO" />
          </div>
        </div>
        <div className="header-right">
          {header}
        </div>
      </div>
    </header>
  )
};

export default Header;
