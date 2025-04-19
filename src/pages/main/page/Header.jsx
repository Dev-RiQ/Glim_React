import { React } from 'react';
import '../style/header.css';

function Header() {
  return (
    <header>
      <div className="header">
        <div className="header-left">
          <div className="logo">
            <img src="http://place-hold.it/100x60" alt="LOGO" />
          </div>
        </div>
        <div className="header-right">
          <a href="/#">test</a>
          <a href="/#">test2</a>
        </div>
      </div>
    </header>
  )
};

export default Header;
