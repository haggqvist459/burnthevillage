import React from 'react';
import '../sass/index.scss';
import { Hamburger } from './';


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