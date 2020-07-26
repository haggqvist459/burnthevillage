import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header/header'
import Footer from '../components/footer/footer';
import '../sass/pages/signup.scss';
import { SignButton } from '../components/styledmaterial/buttons';
import { SignField } from '../components/styledmaterial/textFields';


class SignUp extends Component {

  signUp() {
    console.log("sign up clicked");
  }


  render() {

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
  }
}

export default SignUp;

