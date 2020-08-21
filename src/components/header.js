import React from 'react';
import '../sass/index.scss';
import { Hamburger } from './';
import { Grid, Typography } from '@material-ui/core';


function Header() {
  return (
    <Grid className="header">
    
      <Grid className="header__hamburger">
        <Hamburger />
      </Grid>
      <Grid className="header__logo">
        <Grid className="header__logo__image"></Grid>
        <Typography variant="h4" className="header__logo__text">Burn the<br></br>Village</Typography>
      </Grid>

    </Grid>
  );
}

export default Header;