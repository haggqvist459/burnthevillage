import React, { Component } from 'react';
import Hamburger from "../components/hamburger/hamburger"

class Home extends Component {
  render (){
  
    return(
        <div className="homeBackground">
        <Hamburger />
        <p>home</p>
        </div>
    )
  }
}

export default Home;

  