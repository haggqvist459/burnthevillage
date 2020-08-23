import React, { useCallback, useState } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import '../sass/index.scss';
import { Header, Footer, SignButton, SignField, firebase, localConstants } from '../components';
import { userActions } from '../store/actions';
import { LinearProgress, Grid, Typography } from '@material-ui/core';


const SignIn = ({ history }) => {

  const auth = firebase.auth();
  const db = firebase.firestore();
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState();

  //const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  //const buffer300 = async (time) => { await sleep(time) }
  //const startBuffer = async () => { await buffer300(300) }

  const handleLogin = useCallback(async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;

    setError(false);
    setLoad(true);

    try {
      await auth.signInWithEmailAndPassword(email.value, password.value).then((user) => {
        user.user.reload().then(() => {
          console.log({ emailVerified: user.user.emailVerified })
        })
        if (user.user.emailVerified) {
          console.log(user.user.displayName + ' is verified');

          try {
            const getUser = async () => {
              const userRef = db.collection('users').doc(user.user.displayName);
              const doc = await userRef.get();
              if (!doc.exists) {
                console.log(error);
                throw new Error(error);
              }
              else {
                console.log(doc.data());
                let user = doc.data();
                localStorage.setItem(localConstants.PLAYER_TAG, user.playertag);

                try {
                  dispatch(userActions.getUser(user.playertag)).then(() => {
                    console.log('sign in fetch data complete ');
                    setLoad(false);
                    history.push('/profile');
                  });
                } catch (error) {
                  console.log(error)
                  throw new Error(error);
                }
              }
            }

            getUser();
          } catch (error) {
            console.log(error);
            throw new Error(error);
          }
        }
        else {
          console.log('user is not email verified');
          setLoad(false);
          setErrorMsg('email not verified');
          setError(true);
        }
      })
    } catch (error) {
      setError(true);
      if (error.message.includes('Too many unsuccessful')) {
        setErrorMsg(error.message);
      }
      else {
        setErrorMsg('bad combo')
      }
      setLoad(false);
      console.log(error);
    }
  }, [history, auth, db, error, dispatch]);

  // if (currentUser) {
  //   return <Redirect to='/profile' />;
  // } 

  return (
    <Grid className="wrapper">

      <Header />

      <Grid className="content">

        <Grid className="sign_in_container">
          <form onSubmit={handleLogin}>

            <SignField
              error={error}
              label="email"
              name="email"
              helperText={error ? errorMsg : ' '}
              variant="outlined"
              type="email"
              required id="outlined-error-helper-text"
            />

            <SignField
              error={error}
              label="password"
              name="password"
              variant="outlined"
              type="password"
              required id="standard-required password"
            />

            {load ?
              <SignButton variant="outlined" disabled>Sign In</SignButton>
              :
              <SignButton type="submit" variant="outlined">Sign In</SignButton>
            }

            <Grid className="sign_in_container__bottom_row">
              <Grid>
                <Typography>Forgot password?</Typography>
              </Grid>
              <Grid>
                <Typography>Need an account? </Typography>
                <br></br>
                <Link to="/signup"><Typography>Sign up here!</Typography></Link>
              </Grid>
            </Grid>
          </form>

          <Grid>
            {load ?
              <Grid style={{ marginTop: "30px" }}>
                <LinearProgress color="primary" />
                <LinearProgress color="secondary" />
              </Grid>
              :
              null}

          </Grid>
        </Grid>

      </Grid>

      <Footer />

    </Grid>
  )
}

export default withRouter(SignIn);