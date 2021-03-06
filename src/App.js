import "./App.css";
import React, { Component } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { StylesProvider } from "@material-ui/styles";
import localStorage from "local-storage";
// import QuestionWrapper from "./Components/Pages/QuestionWrapper";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
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
import Voucher from "./Components/Voucher";
import "./App.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#60308b",
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
    isLoggedIn: false,
    userId: "",
    questionState: {
      userId: "...",
      questionId: "",
      title: "...",
      text1: "...",
      text2: "...",
      url1: "",
      url2: "",
      isSponsored: false,
      numberOfVotes: 0,
      seconds: 10,
      group: true,
      sponsoredData: {
        logoURL: "",
        percentageDiscount: "",
        discountTerms: "",
        imageURL: "",
        voucherCode: "",
        description: ""
      }
    }
  };

  saveToLocalStorage = () => {
    try {
      localStorage.set("isLoggedIn", JSON.stringify(this.state.isLoggedIn));
      localStorage.set("userId", JSON.stringify(this.state.userId));
      localStorage.set(
        "questionState",
        JSON.stringify(this.state.questionState)
      );
    } catch (e) {}
  };

  loadFromLocalStorage = () => {
    try {
      var isLoggedInCopy = JSON.parse(localStorage.get("isLoggedIn"));
      this.setState({
        isLoggedIn: isLoggedInCopy
      });
      var userIdCopy = JSON.parse(localStorage.get("userId"));
      this.setState({
        userId: userIdCopy
      });
      var questionStateCopy = JSON.parse(localStorage.get("questionState"));
      this.setState({
        questionState: questionStateCopy
      });
    } catch (e) {}
  };

  setUserId = (newValue) => {
    this.setState(
      {
        userId: newValue
      },
      function() {
        this.saveToLocalStorage();
        console.log("The user id got set to: " + newValue);
      }
    );
  };

  getUserId = () => {
    return this.state.userId;
  };

  changeIsLoggedIn = (newValue) => {
    this.setState(
      {
        isLoggedIn: newValue
      },
      function() {
        this.saveToLocalStorage();
        console.log("This got called: " + this.state.isLoggedIn);
      }
    );
  };

  getIsLoggedIn = () => {
    return this.state.isLoggedIn;
  };

  setQuestionState = (newValue) => {
    this.setState(
      {
        questionState: newValue
      },
      () => {
        console.log("questionState has been set");
        console.log(this.state.questionState);
        this.saveToLocalStorage();
      }
    );
  };

  getQuestionState = () => {
    console.log("question set has been retrieved");
    console.log(this.state.questionState);
    console.log("question set has been retrieved");
    return this.state.questionState;
  };

  UNSAFE_componentWillMount = () => {
    this.loadFromLocalStorage();
  };

  UNSAFE_componentWillUnmount = () => {
    this.saveToLocalStorage();
  };

  UNSAFE_componentWillUpdate = () => {
    this.saveToLocalStorage();
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <Router>
            <div>
              <Header
                isLoggedIn={this.state.isLoggedIn}
                changeIsLoggedIn={this.changeIsLoggedIn}
              />{" "}
              <div className="screen">
                <div className="background">
                  {" "}
                  <Switch>
                    <Route
                      path="/login"
                      render={(props) =>
                        this.state.isLoggedIn ? (
                          <Redirect to="/feed" />
                        ) : (
                          <Login changeIsLoggedIn={this.changeIsLoggedIn} />
                        )
                      }
                    />{" "}
                    <Route
                      path="/signup"
                      render={(props) =>
                        this.state.isLoggedIn ? (
                          <Redirect to="/feed" />
                        ) : (
                          <Signup />
                        )
                      }
                    />{" "}
                    <Route
                      path="/feed"
                      render={(props) =>
                        this.state.isLoggedIn ? (
                          <Question
                            setUserId={this.setUserId}
                            getUserId={this.getUserId}
                            getIsLoggedIn={this.getIsLoggedIn}
                            changeIsLoggedIn={this.changeIsLoggedIn}
                            userId={this.state.userId}
                            setQuestionState={this.setQuestionState}
                          />
                        ) : (
                          <Question
                            setUserId={this.setUserId}
                            getUserId={this.getUserId}
                            getIsLoggedIn={this.getIsLoggedIn}
                            changeIsLoggedIn={this.changeIsLoggedIn}
                            userId={this.state.userId}
                            setQuestionState={this.setQuestionState}
                          />
                        )
                      }
                    />{" "}
                    <Route
                      path="/creator"
                      render={(props) =>
                        this.state.isLoggedIn ? (
                          <Creator userId={this.state.userId} />
                        ) : (
                          <Redirect to="/login" />
                        )
                      }
                    />{" "}
                    <Route
                      path="/profile"
                      render={(props) =>
                        this.state.isLoggedIn ? (
                          <Profile getQuestionState={this.getQuestionState} />
                        ) : (
                          <Redirect to="/login" />
                        )
                      }
                    />{" "}
                    <Route
                      path="/question"
                      render={(props) =>
                        this.state.isLoggedIn ? (
                          <Question
                            setUserId={this.setUserId}
                            getUserId={this.getUserId}
                            getIsLoggedIn={this.getIsLoggedIn}
                            changeIsLoggedIn={this.changeIsLoggedIn}
                            userId={this.state.userId}
                            setQuestionState={this.setQuestionState}
                          />
                        ) : (
                          <Redirect to="/login" />
                        )
                      }
                    />{" "}
                    <Route
                      path="/totsubmit"
                      render={(props) =>
                        this.state.isLoggedIn ? (
                          <ToTSubmit />
                        ) : (
                          <Redirect to="/login" />
                        )
                      }
                    />{" "}
                    <Route
                      path="/voucher"
                      render={(props) =>
                        this.state.isLoggedIn ? (
                          <Voucher />
                        ) : (
                          <Redirect to="/login" />
                        )
                      }
                    />{" "}
                    <Route
                      path="/profiletot"
                      render={(props) =>
                        this.state.isLoggedIn ? (
                          <ProfileToT
                            getQuestionState={this.getQuestionState}
                          />
                        ) : (
                          <Redirect to="/login" />
                        )
                      }
                    />{" "}
                    <Route
                      path="*"
                      render={(props) =>
                        this.state.isLoggedIn ? (
                          <Question
                            setUserId={this.setUserId}
                            getUserId={this.getUserId}
                            getIsLoggedIn={this.getIsLoggedIn}
                            changeIsLoggedIn={this.changeIsLoggedIn}
                            userId={this.state.userId}
                            setQuestionState={this.setQuestionState}
                          />
                        ) : (
                          <Redirect to="/login" />
                        )
                      }
                    />{" "}
                  </Switch>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </Router>{" "}
        </StylesProvider>{" "}
      </MuiThemeProvider>
    );
  }
}

export default App;
