import React, { Component } from 'react';
import Header from '../components/header/header'
import '../sass/pages/about.scss'
import Tim from '../assets/images/about/abouttim.png';
import Max from '../assets/images/about/aboutmax.png';
import Alicia from '../assets/images/about/aboutalicia.png';

class About extends Component {
  render() {

    return (
      <div>
        <Header />
        <div className="aboutContainer">
          <h1>About us</h1>
          <div className="aboutContainer__card_column">

            <div className="aboutContainer__card_column__card">
              <img src={Tim} alt={"portrait"}  className="aboutContainer__card_column__card__portrait"></img>
              <div className="aboutContainer__card_column__card__description">
              <h4>Tim Haggqvist Luotomaki</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus interdum nibh nec dolor feugiat, 
                ac gravida augue fermentum. Proin id justo eget orci pretium vulputate vitae nec ipsum. 
                Suspendisse a felis quis orci semper pulvinar. Nam convallis lorem est, sed rhoncus nunc faucibus at. 
                Ut volutpat condimentum nibh sit amet blandit.</p>
              </div>
            </div>

            <div className="aboutContainer__card_column__card">
            <img src={Max} alt={"portrait"}  className="aboutContainer__card_column__card__portrait"></img>
              <div className="aboutContainer__card_column__card__description">
              <h4>Max Haggqvist Luotomaki</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus interdum nibh nec dolor feugiat, 
                ac gravida augue fermentum. Proin id justo eget orci pretium vulputate vitae nec ipsum. 
                Suspendisse a felis quis orci semper pulvinar. Nam convallis lorem est, sed rhoncus nunc faucibus at. 
                Ut volutpat condimentum nibh sit amet blandit.</p>
              </div>
            </div>

            <div className="aboutContainer__card_column__card">
            <img src={Alicia} alt={"portrait"} className="aboutContainer__card_column__card__portrait"></img>
              <div className="aboutContainer__card_column__card__description">
              <h4>Alicia Haggqvist Luotomaki</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus interdum nibh nec dolor feugiat, 
                ac gravida augue fermentum. Proin id justo eget orci pretium vulputate vitae nec ipsum. 
                Suspendisse a felis quis orci semper pulvinar. Nam convallis lorem est, sed rhoncus nunc faucibus at. 
                Ut volutpat condimentum nibh sit amet blandit.</p>
              </div>
            </div>
          </div>


        </div>
      </div>
    )
  }
}

export default About;

