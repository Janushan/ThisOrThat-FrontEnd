import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import Header from "../../Header";
import Question from "../../Question";
import Creator from "../../Creator";
import Join from "../../Join";
import ToTSubmit from "../../ToTSubmit";
import "./QuestionWrapper.css";

export default function QuestionWrapper() {
  return (
    <Router>
      <div>
        <Header />
        <div className="screen">
          <div className="background">
            {" "}
            <Switch>
              <Route exact path="/" render={(props) => <Question />} />
              <Route exact path="/submit" render={(props) => <ToTSubmit />} />
              <Route exact path="/join" render={(props) => <Join />} />
              <Route exact path="/create" render={(props) => <Creator />} />
            </Switch>
          </div>{" "}
        </div>{" "}
      </div>
    </Router>
  );
}
