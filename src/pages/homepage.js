import React, { Component } from 'react';
import Hamburger from "../components/hamburger/hamburger"
import backgroundImage from '../assets/images/hpbackground.png'
import '../sass/pages/homepage.scss';


class Home extends Component {
  render (){
  
    return(
        <div className="homepageBackground">
          <Hamburger className="hamburger"/>
        </div>
    )
  }
}

export default Home;

  