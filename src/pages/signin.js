import React, { useCallback, useState } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import '../sass/pages/signin.scss';
import { SignButton } from '../components/styledmaterial/buttons';
import { SignField } from '../components/styledmaterial/textFields';

import firebase from '../components/utils/firebaseConfig';
import { PlayerByTag } from '../cloudFunctions';
import LinearProgress from '@material-ui/core/LinearProgress';

const SignIn = ({ history }) => {

  const auth = firebase.auth();
  const db = firebase.firestore();
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const handleLogin = useCallback(async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;

    const buffer300 = async (time) => { await sleep(time) }
    const startBuffer = async () => { await buffer300(300) }

    setLoad(true);
    await startBuffer();

    try {

      await auth.signInWithEmailAndPassword(email.value, password.value).then((user) => {
        user.user.reload().then(() => {
          console.log({ emailVerified: user.user.emailVerified })
        })
        if (user.user.emailVerified) {
          console.log('user is email verified');
          console.log('username: ' + user.user.displayName);

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
                localStorage.setItem('playerTag', user.playertag);

                try {
                  const fetchData = async () => { await PlayerByTag() }

                  fetchData().then(() => {
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
  }, [history, auth, db, error]);

  // if (currentUser) {
  //   return <Redirect to='/profile' />;
  // }

  return (
    <div>
      <Header />

      <div className="sign_in_container">
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

          <SignButton type="submit" variant="outlined">Sign In</SignButton>
          <div className="sign_in_container__bottom_row">
            <div>
              <Link to="/forgot">Forgot password?</Link>
            </div>
            <div>
              <p>Need an account? </p>
              <br></br>
              <Link to="/signup">Sign up here!</Link>
            </div>
          </div>
        </form>

        <div>
          {load ?
            <div style={{ marginTop: "30px" }}>
              <LinearProgress color="primary" />
              <LinearProgress color="secondary" />
            </div>
            : null}

        </div>
      </div>
      <Footer />
    </div>
  )
}

export default withRouter(SignIn);

/*


*/