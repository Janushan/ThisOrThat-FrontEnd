import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FacebookIcon from "@material-ui/icons/Facebook";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'


import "./styles.css";

export default class Login extends Component {
  state = {
    userName: "",
    password: "",
    validated: 0
  };

  change = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.userName === "" || this.state.password === "") {
      alert("You must complete all fields");
    } else {
      // axios.post('', {
      // username: this.state.userName,
      // passwd: this.state.password
      // })
      // .then(response => {
      //   this.setState({ validated: response.data})
      //   if(this.state.validated===1){
      //     localStorage.setItem('user',this.state.userName);
      //     // this.props.history.push("/<homepage>"); add in path to home page here
      //   }else{
      //     alert("Wrong Credentials");
      //     this.setState({ password: ""});
      //   }
      // })

      this.props.changeIsLoggedIn(true);
    }
  };

  facebookLogin = (response) => {
    if(response.userID) {
      this.props.changeIsLoggedIn(true);
      console.log("Facebook login was successful!");
    } else {
      console.log("Facebook login was unsucessful!");
    }
  }

  render() {
    return (
      <div>
        <div className="wrapper">
          <Card className="loginCard" raised>
            <form className="login">
              <CardHeader title="Login" />
              <Grid container direction="column" alignItems="center">
                <TextField
                  name="userName"
                  label="Username"
                  variant="outlined"
                  className="loginTextField"
                  value={this.state.firstName}
                  fullWidth={true}
                  onChange={(e) => this.change(e)}
                />
                <TextField
                  name="password"
                  label="Password"
                  variant="outlined"
                  value={this.state.password}
                  fullWidth={true}
                  onChange={(e) => this.change(e)}
                  type="password"
                />
              </Grid>
              <Grid container direction="column" alignItems="center">
                <Grid container direction="column" alignItems="center">
                  <Button
                    variant="contained"
                    color="primary"
                    className="loginButtonWrapper"
                    onClick={(e) => this.onSubmit(e)}
                  >
                    Login
                  </Button>
                  <FacebookLogin
                      appId="542050589716105"
                      autLoad
                      fields="name,email,picture"
                      callback={this.facebookLogin}
                      render={renderProps => (
                        <Button onClick={renderProps.onClick} className="facebookLoginButton" startIcon={<FacebookIcon />}>Log in with Facebook</Button>
                      )}
                  />
                  <Grid
                    container
                    alignItems="center"
                    justify="center"
                    className="signupMessage"
                  >
                    <Typography color="textSecondary" className="signupText">
                      Don't have an account?
                    </Typography>
                    <Link to="/signup">Sign Up</Link>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Card>
        </div>
      </div>
    );
  }
}
