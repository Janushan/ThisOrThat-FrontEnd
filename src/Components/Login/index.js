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
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import "./styles.css";

export default class Login extends Component {
  state = {
    email: "",
    password: "",
    validated: 0,
    open1: false,
    errorMessage: ""
  };

  handleClose = (openIndex) => {
    console.log(openIndex);
    if (openIndex === 1) {
      this.setState({
        open1: false
      });
    } else {
      this.setState({
        open2: false
      });
    }
  };

  change = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    var alertString = "";
    if (this.state.email === "" || this.state.password === "") {
      alertString += "You must complete all fields";
      this.setState({ errorMessage: alertString });
      this.setState({ open1: true });
    } else {
      axios
        .post(
          "https://thisorthat-260419.appspot.com/api/login/email",
          {
            email: this.state.email,
            password: this.state.password
          },
          { withCredentials: true }
        )
        .then((response) => {
          console.log(response);
          this.setState({ validated: response.data });
          if (response.status === 201) {
            axios({
              method: "get",
              url: "https://thisorthat-260419.appspot.com/api/me",
              withCredentials: true
            }).then((response2) => {
              console.log(response2);
              this.props.changeIsLoggedIn(true);
              // if(this.state.email=="sooklal82@gmail.com"){
              //   localStorage.setItem('userId',"5e10c775e07268eb819a8f2a");
              // }else{
              //   localStorage.setItem('userId',"5e1297ca9f463f4ca9b7bc89");
              // }
            });
          } else {
            alertString += "Invalid Credentials";
            this.setState({ errorMessage: alertString });
            this.setState({ open1: true });
            this.setState({ password: "" });
          }
        });
    }
  };

  facebookLogin = (response) => {
    if (response.userID) {
      this.props.changeIsLoggedIn(true);
      console.log("Facebook login was successful!");
    } else {
      console.log("Facebook login was unsucessful!");
    }
  };

  fbLogin = () => {
    window.location.href =
      "https://thisorthat-260419.appspot.com/api/login/facebook/init?redirect=http://localhost:3000/feed";
  };

  render() {
    return (
      <div>
        <div className="wrapper">
          <Card className="loginCard" raised>
            <form className="login">
              <CardHeader title="Login" />
              <Grid container direction="column" alignItems="center">
                <TextField
                  name="email"
                  label="Email"
                  variant="outlined"
                  className="loginTextField"
                  value={this.state.email}
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
                  <Button
                    className="facebookLoginButton"
                    href="https://thisorthat-260419.appspot.com/api/login/facebook/init?redirect=https://thisorthat-260419.appspot.com/feed"
                    // onClick={(e) => this.fbLogin(e)}
                    startIcon={<FacebookIcon />}
                  >
                    Log in with Facebook
                  </Button>
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
        <Dialog
          open={this.state.open1}
          onClose={this.handleClose.bind(this, 1)}
        >
          <DialogTitle>{""}</DialogTitle>
          <DialogContent>{this.state.errorMessage}</DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose.bind(this, 1)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
