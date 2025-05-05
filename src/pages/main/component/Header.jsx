import { React, useEffect, useState } from 'react';
import '../style/header.css';
import IconButton from '../../../components/IconButton';
import { faBell, faCircle, faPaperPlane, faUserTie } from "@fortawesome/free-solid-svg-icons";
import logoLightMode from "../../../assets/images/logo-light-mode.png";
import logoDarkMode from "../../../assets/images/logo-dark-mode.png";
import sseEvent from '../../../utils/sse';
import api from '../../../utils/api';

function Header() {
  const [viewMode, changeMode] = useState(logoLightMode);
  const [hasAlarm, setHasAlarm] = useState(false)
  const [hasChat, setHasChat] = useState(false)
  const isBrowserDarkMode = window.matchMedia('(prefers-color-scheme: dark)')
    .matches

  useEffect(() => {
    getSse()
    changeMode(isBrowserDarkMode ? logoDarkMode : logoLightMode);
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
  const uri = window.location.pathname;

  useEffect(() => {
    getHeader()
  }, [hasChat, hasAlarm])

  async function getHeader() {
    const res = await api.get('/auth/role')
    console.log(res)
    let headerIcon = [];
    if (res === 'ROLE_ADMIN') {
      (headerIcon = [...headerIcon, getButton(faUserTie, '/admin', uri === '/admin' ? true : '')]);
    }
    headerIcon = [...headerIcon, getButton(faBell, '/alarm', uri === '/alarm' ? true : '')];
    headerIcon = [...headerIcon, getButton(faPaperPlane, '/chat', uri === '/chat' ? true : '')];
    setHeader(headerIcon);
  }

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
