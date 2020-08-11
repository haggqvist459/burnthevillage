import React from 'react';
import { withRouter } from 'react-router';
import { Header, Footer } from '../components';
import { Grid, Typography } from '@material-ui/core';

const Terms = ({ history }) => {

  return (
    <Grid className="wrapper">>
    
      <Header />

      <Grid className="content">
        <Typography>terms</Typography>
      </Grid>

      <Footer />

    </Grid>
  )
}

export default withRouter(Terms);