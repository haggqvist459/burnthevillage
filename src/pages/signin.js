import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header/header';
import '../sass/pages/signin.scss';
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
    marginTop: "20px",
  }
}))(TextField);

class SignIn extends Component {


  forgotPassword() {
    console.log("forgot password clicked");
  }

  signUp() {
    console.log("sign up clicked");
  }

  render() {

    return (
      <div>
        <Header />

        <div className="sign_in_container">
          <form>

            <StyledTextField
              variant="outlined"
              label="email"
            />

            <StyledTextField
              variant="outlined"
              label="password"
              type="password"
            />


            <ColorButton variant="outlined">Sign In</ColorButton>

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

      </div>
    )
  }
}

export default SignIn;

