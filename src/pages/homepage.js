import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Hamburger from "../components/hamburger/hamburger"
import '../sass/pages/homepage.scss';


class Home extends Component {
  render() {

    return (
      <div className="homepageBackground">
        <div className="hamburger">
          <Hamburger />
        </div>

        <div className="homepageBackground__instruction_container">

          <div className="homepageBackground__instruction_container__row">

            <div className="homepageBackground__instruction_container__row__instruction_box">

              <p>[bajskorv instruction]</p>
            </div>

            <div className="homepageBackground__instruction_container__row__instruction_box">

              <p>[second instruction]</p>
            </div>

            <div className="homepageBackground__instruction_container__row__instruction_box">

              <p>[third instruction]</p>
            </div>

          </div>

          <div className="homepageBackground__instruction_container__row">
            <div className="homepageBackground__instruction_container__row__instruction_box_hidden">

            </div>
            <div className="homepageBackground__instruction_container__row__instruction_box">
              <Link to="/upload">Get started!</Link>
            </div>
            <div className="homepageBackground__instruction_container__row__instruction_box_hidden">

            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default Home;

