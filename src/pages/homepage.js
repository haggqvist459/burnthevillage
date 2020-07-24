import React, { Component } from 'react';
import Hamburger from "../components/hamburger/hamburger"
import '../sass/pages/homepage.scss';


class Home extends Component {
  render() {

    return (
      <div className="homepageBackground">
        <div className="hamburger">
          <Hamburger />
        </div>
      </div>
    )
  }
}

export default Home;

