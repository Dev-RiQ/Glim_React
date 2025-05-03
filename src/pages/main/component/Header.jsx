import { React, useEffect, useState } from 'react';
import '../style/header.css';
import IconButton from '../../../components/IconButton';
import { faBell, faCircle, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import logoLightMode from "../../../assets/images/logo-light-mode.png";
import logoDarkMode from "../../../assets/images/logo-dark-mode.png";
import sseEvent from '../../../utils/sse';

function Header() {
  const [viewMode, changeMode] = useState(logoLightMode);
  const [hasAlarm, setHasAlarm] = useState(false)
  const [hasChat, setHasChat] = useState(false)
  function changeViewMode() {
    changeMode(viewMode === logoLightMode ? logoDarkMode : logoLightMode);
  }

  useEffect(() => {
    getSse()
  }, [])

  async function getSse() {
    const res = await sseEvent('/sse/header')
    res.addEventListener('header', async (e) => {
      const data = JSON.parse(e.data)
      setHasAlarm(data.hasAlarm)
      setHasChat(data.hasChat)
    })
  }

  const [header, setHeader] = useState(null);
  const [modal, setModal] = useState(false);
  const uri = window.location.pathname;

  useEffect(() => {
    let headerIcon = [];
    headerIcon = [...headerIcon, getButton(faBell, '/alarm', uri === '/alarm' ? true : '')];
    headerIcon = [...headerIcon, getButton(faPaperPlane, '/chat', uri === '/chat' ? true : '')];
    setHeader(headerIcon);
  }, [modal, hasChat, hasAlarm])

  function buttonEvent(link) {
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
      <>
        {(link === '/alarm' && hasAlarm) || (link === '/chat' && hasChat) ?
          <div className={`has-alarm ${link.substring(1, link.length)}`}>
            <IconButton icon={faCircle} />
          </div>
          : <></>
        }
      </>
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
