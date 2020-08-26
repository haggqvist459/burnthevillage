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

            <Typography>Upload a screenshot</Typography>
          </Grid>

          <Grid className="homepageBackground__instruction_container__row__instruction_box">

            <Typography>Browse the results</Typography>
          </Grid>

          <Grid className="homepageBackground__instruction_container__row__instruction_box">

            <Typography>Duplicate the attack</Typography>
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

