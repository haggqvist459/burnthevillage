import React, { Component } from 'react';
import background from '../assets/images/hpbackground.png';
import Hamburger from '../components/hamburger/hamburger';
import './pages.css'


class Home extends Component {
  render (){
  
    return(
        <div className="homeBackground">
            <Hamburger/>
        </div>
    )
  }
}

export default Home;

  