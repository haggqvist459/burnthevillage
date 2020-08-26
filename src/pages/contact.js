import React from 'react';
import { withRouter } from 'react-router';
import { Header, Footer } from '../components';
import { Grid, Typography } from '@material-ui/core'

const Contact = ({ history }) => {

  return (
    <Grid className="wrapper">
    
      <Header />

      <Grid className="content">
        <Typography>contact</Typography>
      </Grid>

      <Footer />

    </Grid>
  )
}

export default withRouter(Contact);

