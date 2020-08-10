import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import Header from '../components/header/header'
import Footer from '../components/footer/footer';
import { SignButton } from '../components/styledmaterial/buttons';
import { SignField } from '../components/styledmaterial/textFields';
import { PlayerByTag, LOCAL_PLAYER_TAG, LOCAL_PLAYER } from '../cloudFunctions'
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import '../sass/pages/signup.scss';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';

import firebase from 'firebase';
const db = firebase.firestore();


const SignUp = ({ history }) => {


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
    localStorage.setItem(LOCAL_PLAYER_TAG, playertag.value);

    //check if playertag exists in api, return is put in localstorage
    await PlayerByTag();

    //get localstorage value
    let player = JSON.parse(localStorage.getItem(LOCAL_PLAYER));

    //check missing playertag
    if (player.reason === 'notFound') {

      //it doesnt, set playertag text field error to true, remove loading 
      console.log('tag not found')
      setError(true);
      setLoad(false);
    }
    else {

      //it does, start create user chain
      try {

        //first in chain, create user
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
        setLoad(false);
        setValues({
          username: '',
          email: '',
          password: '',
          playertag: '',
        })
      }
    }
  }, []);


  return (
    <div>
      <Header />

      <div className="sign_up_container">
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

          <div>
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
              <div><p>email verification popover</p></div>


              <Button onClick={handleClosePopover}>OK!</Button>
            </Popover>
            {load ?

              <div style={{ marginTop: "30px" }}>
                <LinearProgress color="primary" />
                <LinearProgress color="secondary" />
              </div>
              :
              <SignButton id="signupButton" variant="outlined" type="submit">Sign Up</SignButton>}

          </div>
          <div className="sign_up_container__bottom_row">

            <div className="sign_up_container__bottom_row__text_row">
              <p>By creating an account, you agree to our </p><Link to="/"> terms</Link>
            </div>
            <div className="sign_up_container__bottom_row__text_row">
              <p>Already have an account? </p><Link to="/signin"> Sign in</Link>
            </div>

          </div>

        </form>



      </div>

      <Footer />
    </div>
  )
}

export default withRouter(SignUp);