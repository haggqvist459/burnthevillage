import React, { useCallback } from 'react';
import { withRouter } from 'react-router';
import '../sass/index.scss';
import { Hamburger } from '../components';
import { Button } from '@material-ui/core';

 
const Home = ({ history }) => {


  const handleClick = useCallback(async event => {
    event.preventDefault();

    try {
      history.push('/upload');
    } catch (error) {
      alert(error);
    }

  }, [history]);

  return (
    <div className="homepageBackground">
      <div className="hamburger">
        <Hamburger />
      </div>

      <div className="homepageBackground__instruction_container">

        <div className="homepageBackground__instruction_container__row">

          <div className="homepageBackground__instruction_container__row__instruction_box">

            <p>[first instruction]</p>
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
            <Button onClick={handleClick} >Get started!</Button>
          </div>
          <div className="homepageBackground__instruction_container__row__instruction_box_hidden">

          </div>
        </div>

      </div>
    </div>
  )

}

export default withRouter(Home);

