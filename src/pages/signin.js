import React, { useCallback, useContext, useState } from 'react';
import { withRouter, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import '../sass/pages/signin.scss';
import { SignButton } from '../components/styledmaterial/buttons';
import { SignField } from '../components/styledmaterial/textFields';
//login stuff
import firebase from '../components/firebase/config'
import { AuthContext } from '../components/utils/auth';
import { LOCAL_PLAYER_TAG } from '../cloudFunctions';
import LinearProgress from '@material-ui/core/LinearProgress';

const SignIn = ({ history }) => {

  const [load, setLoad] = useState(false);
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
  const buffer300 = async (time) => { await sleep(time) }
  const startBuffer = async () => { await buffer300(300) }


  const handleLogin = useCallback(async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;

    setLoad(true);
    await startBuffer();

    try {

      await startBuffer();
      await firebase.auth().signInWithEmailAndPassword(email.value, password.value);
      await localStorage.setItem(LOCAL_PLAYER_TAG, '2L29QJY9');
      await startBuffer();
      setLoad(false);

      history.push('/profile');
    } catch (error) {
      console.log(error);
    }
    
    setLoad(false);

  }, [history]);


  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to='/profile' />;
  }

  return (
    <div>
      <Header />

      <div className="sign_in_container">
        <form onSubmit={handleLogin}>
          <SignField
            variant="outlined"
            name="email"
            type="email"
            label="email"
          />
          <SignField
            variant="outlined"
            label="password"
            name="password"
            type="password"
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