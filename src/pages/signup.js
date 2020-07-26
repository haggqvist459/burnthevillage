import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header/header'
import Footer from '../components/footer/footer';
import '../sass/pages/signup.scss';
import { TextField, Button, withStyles } from '@material-ui/core';

const ColorButton = withStyles(() => ({
  root: {
    height: "100px",
    width: "100%",
    marginTop: "20px",
    fontSize: "20px",
    textTransform: "none",
    '&:hover': {
      backgroundColor: "#dfdfdf",
    },
  },
}))(Button);

const StyledTextField = withStyles(() => ({
  root: {
    width: "100%",
    marginTop: "10px",
  }
}))(TextField);

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

            <StyledTextField
              variant="outlined"
              label="username"
              required id="standard-required"
            />

            <StyledTextField
              variant="outlined"
              label="email"
              required id="standard-required"
            />

            <StyledTextField
              variant="outlined"
              label="password"
              type="password"
              required id="standard-required"
            />

            <StyledTextField
              variant="outlined"
              label="player-tag"
            />

            <ColorButton onClick={() => this.signUp()} variant="outlined">Sign Up</ColorButton>

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

