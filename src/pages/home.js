import React, { useCallback } from 'react';
import { withRouter } from 'react-router';
import '../sass/index.scss';
import { Hamburger } from '../components';
import { Button, Grid, Typography } from '@material-ui/core';


 
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
    <Grid className="homepageBackground">
      <Grid className="hamburger">
        <Hamburger />
      </Grid>

      <Grid className="homepageBackground__instruction_container">

        <Grid className="homepageBackground__instruction_container__row">

          <Grid className="homepageBackground__instruction_container__row__instruction_box">

            <Typography>[first instruction]</Typography>
          </Grid>

          <Grid className="homepageBackground__instruction_container__row__instruction_box">

            <Typography>[second instruction]</Typography>
          </Grid>

          <Grid className="homepageBackground__instruction_container__row__instruction_box">

            <Typography>[third instruction]</Typography>
          </Grid>

        </Grid>

        <Grid className="homepageBackground__instruction_container__row">
          <Grid className="homepageBackground__instruction_container__row__instruction_box_hidden">

          </Grid>
          <Grid className="homepageBackground__instruction_container__row__instruction_box">
            <Button onClick={handleClick} >Get started!</Button>
          </Grid>
          <Grid className="homepageBackground__instruction_container__row__instruction_box_hidden">

          </Grid>
        </Grid>

      </Grid>
    </Grid>
  )

}

export default withRouter(Home);

