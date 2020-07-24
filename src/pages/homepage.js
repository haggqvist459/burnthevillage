import React, { Component } from 'react';
import Hamburger from "../components/hamburger/hamburger"
import backgroundImage from '../assets/images/hpbackground.png'
import '../sass/pages/homepage.scss';


class Home extends Component {
  render (){
  
    return(
        <div className="homepageBackground">
          {/* <img src={backgroundImage} alt="image could not load"></img> */}
          <Hamburger />
        </div>
    )
  }
}

export default Home;

  