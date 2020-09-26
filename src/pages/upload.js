import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router';
import { userActions } from '../store/actions';
import { AuthContext } from '../components/utils/auth';
import { firebase } from '../components';
import { firestoreConstants, localConstants } from '../components/utils/constants';
import '../sass/index.scss';
import { Hamburger, UploadButton, UploadIcon } from '../components';
import { Grid, Modal, Typography, LinearProgress, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: "auto",
    marginTop: "15%",
    width: 400,
    backgroundColor: "white",
    opacity: "0.9",
    // border: '2px solid #000',
    // boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  input: {
    display: 'none',
    margin: "auto",
  },
  centerContent: {
    paddingTop: "10vmin",
    textAlign: "center",
    justifyContent: "center",
  },
  button: {
    margin: "auto",
    marginTop: "2vmin",
    marginBottom: "2vmin",
    width: "100%",
    // borderColor: "#101820",
    backgroundColor: "#101820",
    color: "white",
    [theme.breakpoints.down('sm')]: {
      width: "90%",
    }
  },
  disabled: {
    margin: "auto",
    marginTop: "2vmin",
    marginBottom: "2vmin",
    width: "100%",
    borderColor: "#101820",
    backgroundColor: "grey",
    color: "#101820",
    [theme.breakpoints.down('sm')]: {
      width: "90%",
    }
  },
  progress: {
    width: "100%",
    margin: "auto",
    marginTop: "2vmin",
    marginBottom: "2vmin",
    [theme.breakpoints.down('sm')]: {
      width: "90%"
    }
  }
}));

const Upload = ({ history }) => {

  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const uploadBucketFolder = "burnthevillageUploads/";
  const storageRef = firebase.storage().ref(uploadBucketFolder);
  const db = firebase.firestore();
  const { currentUser } = useContext(AuthContext);


  const openModal = () => {
    setOpen(true);
  }

  const closeModal = () => {
    setOpen(false);
  }

  const handleUpload = (e) => {
    console.log("beginning file upload...");
    var file = e.target.files[0];
    console.log(file);

    const fileRef = storageRef.child(file.name).put(file);
    fileRef.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      error => {
        console.log(error);
      },
      () => {
        setProgress(0);
        storageRef
          .child(file.name)
          .getDownloadURL()
          .then(function (url) {
            let bucket = uploadBucketFolder + file.name;
            createFirestoreDocument({ url: url, bucket: bucket });
          }).then(function () {
            history.push('/profile');
          })
      }
    );
  };

  function createFirestoreDocument({ url, bucket }) {
    //create a document named after the image uploaded
    //contain the fields layoutName, imageURL, layoutLink, youtubeURL, creationDate
    const createdAt = new Date().toISOString();
    var displayName = "";
    displayName = localStorage.getItem(localConstants.DISPLAY_NAME);

    db.collection(firestoreConstants.USER_COLLECTION).doc(displayName).collection(firestoreConstants.UPLOAD_HISTORY).doc().set({
      // document fields
      //created at 
      createdAt: createdAt,
      //image ref 
      imageRef: bucket,
      //image url 
      imageURL: url,
    })
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };

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
        <div className={classes.paper}>
          {/* upload instructions  */}
          <Typography variant="h5"> Upload instructions: </Typography>
          <Typography> Center the village in your screenshots for the best result.</Typography>
          <Typography> Screenshots from phones will work, but for the optimal results.</Typography>
          <Typography> You need to be signed in to use this service. </Typography>
          <br />
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            type="file"
            onChange={handleUpload}
          />

          {currentUser ?
            <>
              <label htmlFor="contained-button-file">
              <Button variant="contained" className={classes.button} component="span">
                Upload image
            </Button>
            </label>
            </>
            :
            <Button variant="disabled" className={classes.disabled} component="span">
              Upload image
            </Button>}
          
        <br />
        <LinearProgress className={classes.progress} variant="determinate" value={progress} max="100" />
        {/* upload input for the images */}
        {/* progres bar for the upload progress */}
        {/* close button perhaps */}
        </div>
    </Modal>
    </>
  )
}

export default withRouter(Upload);