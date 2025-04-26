import { React, useEffect, useState } from 'react';
import '../style/footer.css';
import IconButton from '../../../components/IconButton';
import { faHouse, faSearch, faAdd, faFilm, faUser } from "@fortawesome/free-solid-svg-icons";

function Footer(props) {
  const [footer, setFooter] = useState(null);
  const uri = window.location.pathname;

  useEffect(() => {
    let footerIcon = [];
    footerIcon = [...footerIcon, getButton(faHouse, '/', uri === '/' ? true : '')];
    footerIcon = [...footerIcon, getButton(faSearch, '/search', uri === '/search' ? true : '')];
    footerIcon = [...footerIcon, getButton(faAdd, '/addBoard', uri === '/addBoard' ? true : '')];
    footerIcon = [...footerIcon, getButton(faFilm, '/shorts', uri === '/shorts' ? true : '')];
    footerIcon = [...footerIcon, getButton(faUser, '/myPage', uri === '/myPage' ? true : '')];
    setFooter(footerIcon);
  }, [uri])

  function buttonEvent(link) {
    if ((uri === '/add' || uri === '/shorts' || uri === '/mypage') && uri === link) return;
    link !== uri ? window.location.href = link : document.querySelector('section').scrollTo({
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
    <footer>
      <div className="footer">
        {footer}
      </div>
    </footer>
  )
};

export default Footer;
