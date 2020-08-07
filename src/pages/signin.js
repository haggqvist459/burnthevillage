import React, { useCallback, useContext } from 'react';
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

const SignIn = ({history}) => {


  const handleLogin = useCallback ( async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebase.auth().signInWithEmailAndPassword(email.value, password.value);
        history.push('/profile');
      } catch (error) {
        alert(error);
      }
    }, [history]);


    const { currentUser } = useContext(AuthContext);
    if(currentUser){
      return <Redirect to='/profile'/>;
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
      </div>
      <Footer />
    </div>
  )
}

export default withRouter(SignIn);

/*


*/