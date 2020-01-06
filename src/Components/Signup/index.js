import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import "./styles.css";

export default class Signup extends Component {
  state = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    usernameCheck: [],
    usernameError: false,
    open1: false,
    errorMessage: ""
  };

  change = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // changeUser = e => {
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   });
  //   if(e.target.value.length===0){
  //     this.setState({usernameError:false});
  //   }
  //   else if(e.target.value.length>0 && e.target.value.length<5){
  //     this.setState({usernameError:true});
  //   }
  //   else{
  //     axios.post('https://thisorthat-260419.appspot.com/api/me', {
  //         username: e.target.value
  //     })
  //     .then(response => {
  //         this.setState({usernameCheck:response.data});
  //         if(this.state.usernameCheck.length===1){
  //           this.setState({usernameError:true});
  //         }else{
  //           this.setState({usernameError:false});
  //         }
  //     })
  //   }

  // };

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

  onSubmit = (e) => {
    e.preventDefault();
    var alphanumeric = /^[0-9a-zA-Z]+$/;
    var number = /\d/;
    var lowercasePassword = this.state.password.toLowerCase();
    var alertString = "";
    if (
      this.state.userName === "" ||
      this.state.email === "" ||
      this.state.password === "" ||
      this.state.confirmPassword === ""
    ) {
      alertString += "You must complete all fields";
    } else {
      if (this.state.userName.length < 5) {
        alertString += "Username must be at least five(5) characters\n";
      }
      if (
        alphanumeric.test(this.state.userName) === false ||
        alphanumeric.test(this.state.password) === false
      ) {
        alertString +=
          "Username and password fields can only contain alphanumeric characters !\n";
      }
      if (this.state.password.length < 7) {
        alertString += "Password must be at least seven(7) characters!\n";
      }
      if (this.state.password !== this.state.confirmPassword) {
        alertString += "Passwords do not match!\n";
      }
      if (lowercasePassword.localeCompare(this.state.password) === 0) {
        alertString += "Password must contain an Uppercase character!\n";
      }
      if (number.test(this.state.password) === false) {
        alertString += "Password must contain a number!\n";
      }
    }
    if (alertString === "" && this.state.usernameError === false) {
      axios
        .post(
          "https://thisorthat-260419.appspot.com/api/signup/email",
          {
            name: this.state.userName,
            email: this.state.email,
            password: this.state.password
          },
          {
            headers: {}
          }
        )
        .then((response) => {
          // this.props.history.push("/feed");
          console.log("success");
        });
    } else {
      this.setState({ errorMessage: alertString });
      this.setState({ open1: true });
    }
  };

  render() {
    return (
      <div>
        <div className="signupPage">
          <Card className="signupCard" raised>
            <form className="signup">
              <CardHeader title="Signup" />
              <br />
              <TextField
                name="userName"
                label="Full-Name"
                className="usernamefield"
                value={this.state.userName}
                onChange={(e) => this.change(e)}
                error={this.state.usernameError}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="Fullname: Must consist of only letters">
                        <IconButton aria-label="upload image" component="span">
                          <HelpOutlineOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  )
                }}
              />
              <br />
              <TextField
                name="email"
                label="Email"
                value={this.state.email}
                onChange={(e) => this.change(e)}
                type="email"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="Must me a valid email address">
                        <IconButton aria-label="upload image" component="span">
                          <HelpOutlineOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  )
                }}
              />
              <br />
              <TextField
                name="password"
                label="Password"
                value={this.state.password}
                onChange={(e) => this.change(e)}
                type="password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip
                        title="Password: At least 7 alphanumeric characters, an
                Uppercase character and a Number"
                      >
                        <IconButton aria-label="upload image" component="span">
                          <HelpOutlineOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  )
                }}
              />
              <br />
              <TextField
                name="confirmPassword"
                label="Confirm Password"
                value={this.state.confirmPassword}
                onChange={(e) => this.change(e)}
                type="password"
                className="requirements"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="Password entered must match the previously entered password">
                        <IconButton aria-label="upload image" component="span">
                          <HelpOutlineOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  )
                }}
              />
              <br />
              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={(e) => this.onSubmit(e)}
              >
                Submit
              </Button>
              <br />
              <Typography
                variant="overline"
                className=""
                color="textSecondary"
                gutterBottom
              >
                Already have an Account?&nbsp;
              </Typography>
              <Link to="/login">Log In</Link>
            </form>
          </Card>
        </div>
        <Dialog
          open={this.state.open1}
          onClose={this.handleClose.bind(this, 1)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{""}</DialogTitle>
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
