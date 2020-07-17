import React from 'react';
import logo from '../../assets/logo/logo.png';
import './header.css'

function Header() {
  return (
      <header className="">
        <img src={logo}/>
        <p>Burn the</p>
        <br/>
        <p>Village</p>
      </header>
  );
}

export default Header;