import React from 'react';
import '../sass/index.scss';
import { Grid, Typography } from '@material-ui/core';


function Footer() {
  return (
    <Grid className="footer">
      <Grid className="footer__copyright">
        <Typography>Copyright placeholder</Typography>
      </Grid>
    </Grid>
  );
}

export default Footer;