import "./App.css";
import React, { Component } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { StylesProvider } from "@material-ui/styles";
import localStorage from 'local-storage';
// import QuestionWrapper from "./Components/Pages/QuestionWrapper";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Join from "./Components/Join";
import Profile from "./Components/Profile";
import ProfileToT from "./Components/ProfileToT";
import ToTSubmit from "./Components/ToTSubmit";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import Header from "./Components/Header";
import Question from "./Components/Question";
import Creator from "./Components/Creator";

import "./App.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1da1f2",
      light: "#E8EEF8",
      dark: "#0c90e1"
    },
    secondary: {
      main: "#657786",
      light: "#E8EEF8",
      dark: "#2653A6"
    }
  }
});

class App extends Component {

  state = {
    isLoggedIn: false
  }

  saveToLocalStorage = () => {
    try {
      localStorage.set('isLoggedIn', JSON.stringify(this.state.isLoggedIn));
    } catch (e) {
    }
  }

  loadFromLocalStorage = () => {
    try {
      var isLoggedInCopy = JSON.parse(localStorage.get('isLoggedIn'));
      this.setState({ isLoggedIn: isLoggedInCopy });
    } catch (e) {

    }
  }

  changeIsLoggedIn = (newValue) => {
    this.setState({
      isLoggedIn: newValue
    }, function () {
      this.saveToLocalStorage();
      console.log("This got called: " + this.state.isLoggedIn);
    });
  }

  UNSAFE_componentWillMount = () => {
    this.loadFromLocalStorage();
  }

  UNSAFE_componentWillUnmount = () => {
    this.saveToLocalStorage();
  }

  UNSAFE_componentWillUpdate = () => {
    this.saveToLocalStorage();
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <Router>
            <div>
              <Header isLoggedIn={this.state.isLoggedIn} changeIsLoggedIn={this.changeIsLoggedIn} />
              <div className="screen">
                <div className="background">
                  {" "}
                  <Switch>
                    <Route path="/login" render={props => (
                      this.state.isLoggedIn ? (<Redirect to="/feed" />) : (<Login changeIsLoggedIn={this.changeIsLoggedIn} />)
                    )} />
                    <Route path="/signup" render={props => (
                      this.state.isLoggedIn ? (<Redirect to="/feed" />) : (<Signup />)
                    )} />
                    <Route path="/feed" render={props => (
                      this.state.isLoggedIn ? (<Profile />) : (<Redirect to="/login" />)
                    )} />
                    <Route path="/join" render={props => (
                      this.state.isLoggedIn ? (<Join />) : (<Redirect to="/login" />)
                    )} />
                    <Route path="/creator" render={props => (
                      this.state.isLoggedIn ? (<Creator />) : (<Redirect to="/login" />)
                    )} />
                    <Route path="/profile" render={props => (
                      this.state.isLoggedIn ? (<Profile />) : (<Redirect to="/login" />)
                    )} />
                    <Route path="/question" render={props => (
                      this.state.isLoggedIn ? (<Question />) : (<Redirect to="/login" />)
                    )} />
                    <Route path="/totsubmit" render={props => (
                      this.state.isLoggedIn ? (<ToTSubmit />) : (<Redirect to="/login" />)
                    )} />
                    <Route path="/profiletot" render={props => (
                      this.state.isLoggedIn ? (<ProfileToT />) : (<Redirect to="/login" />)
                    )} />
                    <Route path="*" render={props => (
                      this.state.isLoggedIn ? (<Profile />) : (<Redirect to="/login" />)
                    )} />
                  </Switch>
                </div>{" "}
              </div>{" "}
            </div>
          </Router>
        </StylesProvider>
      </MuiThemeProvider>
    );
  }
}

export default App;
