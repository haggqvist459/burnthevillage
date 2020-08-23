import React, { useCallback, useState } from 'react';
import { withRouter } from "react-router";
import '../sass/index.scss';
import { Header, Footer, SignButton, SignField, PlayerByTag, localConstants, firebase } from '../components';
import { LinearProgress, IconButton, InputAdornment, Popover, Button, Grid, Typography } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';


const SignUp = ({ history }) => {

  const db = firebase.firestore();
  const [openPopover, setOpenPopover] = useState(false);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    playertag: '',
    showPassword: false,
  });

  //close post register popover
  const handleClosePopover = useCallback(async event => {
    event.preventDefault();

    setOpenPopover(false);
    setLoad(false);
    setValues({
      username: '',
      email: '',
      password: '',
      playertag: '',
    })

    //redirect to sign in page here
    history.push('/signin');

  }, [history]);

  //handle textfield value changes
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  //handle showpassword button
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  //not sure what this is, was in material ui passwordbutton demo
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //handle signup
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password, username, playertag } = event.target.elements;
    setLoad(true);

    //set playertag in localstorage, will be used to fetch information
    localStorage.setItem(localConstants.LOCAL_PLAYER_TAG, playertag.value);

    //check if playertag exists in api, return is put in localstorage
    await PlayerByTag();

    //get localstorage value
    let player = JSON.parse(localStorage.getItem(localConstants.LOCAL_PLAYER));

    //check missing playertag
    if (player.reason === 'notFound') {

      //it doesnt, set playertag text field error to true, remove loading 
      console.log('tag not found')
      setError(true);
      setLoad(false);
    }
    else {

      //player tag exists, init a create user chain
      try {

        //first in chain, create user and give displayName = username (will be used later to connect user to firestore)
        await firebase.auth().createUserWithEmailAndPassword(email.value, password.value).then(() => {
          const user = firebase.auth().currentUser;
          return user.updateProfile({
            displayName: username.value
          })
        })
          .catch(function (error) {
            //catch create user error
            console.log(error);
            setLoad(false);
            throw new Error(error);
          })

        //send email verification
        await firebase.auth().currentUser.sendEmailVerification().catch(function (error) {
          //catch email verification error
          console.log(error);
          setLoad(false);
          throw new Error(error);
        });

        //store user firestore data
        db
          .collection('users')
          .doc(username.value)
          .set({
            playertag: playertag.value,
            username: username.value,
            role: 'user',
            createdAt: new Date(),
          })
          .then(() => {
            console.log('user stored');
            setLoad(false);
            setOpenPopover(true);
          }).catch(function (error) {
            //catch store user error
            console.log(error);
            setLoad(false);
            throw new Error(error);
          })

      } catch (error) {
        //reset field values, error happened during registration
        setLoad(false);
        setValues({
          username: '',
          email: '',
          password: '',
          playertag: '',
        })
      }
    }
  }, [db]);

  //handle terms
  const handleTermClick = useCallback(async event => {
    history.push('/terms');
  }, [history])

  //handle sign in
  const handleSigninClick = useCallback(async event => {
    history.push('/signin');
  }, [history])


  return (

    <Grid className="wrapper">

      <Header />

      <Grid className="content">

        <Grid className="sign_up_container">

          <form onSubmit={handleSignUp}>

            <SignField
              variant="outlined"
              name="username"
              label="username"
              required id="standard-required username"
              value={values.username}
              onChange={handleChange('username')}
            />

            <SignField
              variant="outlined"
              name="email"
              label="email"
              required id="standard-required email"
              value={values.email}
              onChange={handleChange('email')}
            />

            <SignField
              variant="outlined"
              name="password"
              label="password"
              required id="standard-required password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              InputProps={{
                endAdornment: <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>,
              }}
            />

            <SignField
              error={error}
              label="player-tag"
              name="playertag"
              helperText={error ? 'Invalid player-tag' : ' '}
              variant="outlined"
              required id="outlined-error-helper-text"
              value={values.playertag}
              onChange={handleChange('playertag')}
            />

            <Grid>
              <Popover
                open={openPopover}
                anchorReference="anchorPosition"
                anchorPosition={{ top: 2, left: 2 }}
                anchorOrigin={{
                  vertical: 'center',
                  horizontal: 'center',
                }}
                className="modal"
              >
                <Grid><Typography>email verification popover</Typography></Grid>


                <Button onClick={handleClosePopover}>OK!</Button>
              </Popover>

              {load ?

                <Grid style={{ marginTop: "30px" }}>
                  <LinearProgress color="primary" />
                  <LinearProgress color="secondary" />
                </Grid>
                :
                <SignButton id="signupButton" variant="outlined" type="submit">Sign Up</SignButton>}

            </Grid>
            <Grid className="sign_up_container__bottom_row">

              <Grid className="sign_up_container__bottom_row__text_row">
                <Typography>By creating an account, you agree to our </Typography>
                <Typography onClick={handleTermClick} style={{ textDecoration: 'underline' }}>terms</Typography>
              </Grid>
              <Grid className="sign_up_container__bottom_row__text_row">
                <Typography>Already have an account? </Typography>
                <Typography onClick={handleSigninClick} style={{ textDecoration: 'underline' }}>Sign in!</Typography>
              </Grid>

            </Grid>

          </form>

        </Grid>

      </Grid>

      <Footer />

    </Grid>
  )
}

export default withRouter(SignUp);