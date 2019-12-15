import "./App.css";
import React, { Component } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { StylesProvider } from "@material-ui/styles";
// import QuestionWrapper from "./Components/Pages/QuestionWrapper";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import Header from "./Components/Header";
import Question from "./Components/Question";
// import Creator from "../Creator";
// import Join from "../../Join";
// import ToTSubmit from "../../ToTSubmit";

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
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <Router>
            <div>
              <Header />
              <div className="screen">
                <div className="background">
                  {" "}
                  <Switch>
                    <Route exact path="/" render={(props) => <Question />} />
                    {/* <Route
                      exact
                      path="/submit"
                      render={(props) => <ToTSubmit />}
                    /> */}
                    {/* <Route exact path="/join" render={(props) => <Join />} />
                    <Route
                      exact
                      path="/create"
                      render={(props) => <Creator />} */}
                    />
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
