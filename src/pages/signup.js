import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import firebase from '../components/firebase/config'
import Header from '../components/header/header'
import Footer from '../components/footer/footer';
import { SignButton } from '../components/styledmaterial/buttons';
import { SignField } from '../components/styledmaterial/textFields';
import '../sass/pages/signup.scss';
const SignUp = ({ history }) => {

  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await firebase.auth().createUserWithEmailAndPassword(email.value, password.value);
      history.push('/profile');
    } catch (error) {
      alert(error);
    }
  }, [history]);


  return (
    <div>
      <Header />

      <div className="sign_up_container">
        <form onSubmit={handleSignUp}>

          <SignField
            variant="outlined"
            label="username"
            required id="standard-required"
          />

          <SignField
            variant="outlined"
            name="email"
            label="email"
            required id="standard-required"
          />

          <SignField
            variant="outlined"
            name="password"
            label="password"
            type="password"
            required id="standard-required"
          />

          <SignField
            variant="outlined"
            label="player-tag"
          />

          <SignButton variant="outlined" type="submit">Sign Up</SignButton>

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
/* 

return (
      <div>
        <Header />

        <div className="sign_up_container">
          <form>

            <SignField
              variant="outlined"
              label="username"
              required id="standard-required"
            />

            <SignField
              variant="outlined"
              label="email"
              required id="standard-required"
            />

            <SignField
              variant="outlined"
              label="password"
              type="password"
              required id="standard-required"
            />

            <SignField
              variant="outlined"
              label="player-tag"
            />

            <SignButton onClick={() => this.signUp()} variant="outlined">Sign Up</SignButton>

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
*/