import React from 'react';
import Hamburger from '../hamburger/hamburger';
import '../../sass/components/header.scss';

function Header() {
  return (
    <div className="banner">
      <div className="banner__hamburger">
        <Hamburger />
      </div>
      <div className="banner__logo">
        <div className="banner__image"></div>
        <p className="banner__text">Burn the<br></br>Village</p>
      </div>

    </div>
  );
}

export default Header;