import React from 'react';
import logo from '../assets/logo/logo.png';
import './App.css';

function Header() {
  return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
  );
}

export default Header;