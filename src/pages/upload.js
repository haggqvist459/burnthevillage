import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { userActions } from '../store/actions';


import '../sass/index.scss';
import { Hamburger, UploadButton, UploadIcon } from '../components';
import { Grid, Modal, Typography, Paper } from '@material-ui/core';


const Upload = ({ history }) => {

  function rand() {
    return Math.round(Math.random() * 20) - 10;
  } 

  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const [open, setOpen] = useState(false)
  const [modalStyle] = useState(getModalStyle);

  const openModal = () => {
    setOpen(true);
  }

  const closeModal = () => {
    setOpen(false);
  }

  return (
    <>
      <Grid className="uploadBackground">
        <Grid className="hamburger">
          <Hamburger />
        </Grid>
        <Grid className="uploadBackground__upload_button">
          <UploadButton onClick={openModal}>
            <UploadIcon />
          </UploadButton>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={closeModal}>
        <Paper>
          {/* upload instructions  */}
          <Typography>
            test
          </Typography>
          {/* upload input for the images */}
          {/* progres bar for the upload progress */}
          {/* close button perhaps */}
        </Paper>
      </Modal>
    </>
  )
}

export default withRouter(Upload);