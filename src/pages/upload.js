import React from 'react';
import { withRouter } from 'react-router';
import '../sass/index.scss';
import { Hamburger, UploadButton, UploadIcon } from '../components';
import { Grid } from '@material-ui/core';


const Upload = ({ history }) => {
  
    return (
      <Grid className="uploadBackground">

        <Grid className="hamburger">
          <Hamburger />
        </Grid>

        <Grid className="uploadBackground__upload_button">
          <UploadButton>
            <UploadIcon />
          </UploadButton>
        </Grid>

      </Grid>
    )
}

export default withRouter(Upload);