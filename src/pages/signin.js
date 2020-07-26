import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import '../sass/pages/signin.scss';
import { SignButton } from '../components/styledmaterial/buttons';
import { SignField } from '../components/styledmaterial/textFields';


class SignIn extends Component {

  forgotPassword() {
    console.log("forgot password clicked");
  }

  signUp() {
    console.log("sign up clicked");
  }

  signIn() {

  }

  render() {

    return (
      <div>
        <Header />

        <div className="sign_in_container">
          <form>

            <SignField
              variant="outlined"
              label="email"
            />

            <SignField
              variant="outlined"
              label="password"
              type="password"
            />


            <SignButton onClick={() => this.signIn()} variant="outlined">Sign In</SignButton>

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
}

export default SignIn;

