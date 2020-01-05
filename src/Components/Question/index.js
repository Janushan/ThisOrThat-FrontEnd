import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

import Options from "./options";
import ImageAndTextQuestion from "./imageAndText";
// import ImageQuestion from "./image";
// import TextQuestion from "./text";

import "./styles.css";

export default class Question extends Component {
  state = {
    choice1: 0,
    choice2: 0,
    votes: 0,
    seconds: 10,
    group: true
  };

  componentDidMount() {
    this.myInterval = setInterval(() => {
      const { seconds } = this.state;
      if (seconds > 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1
        }));
      }
      if (seconds === 0) {
        clearInterval(this.myInterval);
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  render() {
    //const { title, option1, option2} = this.props;
    if (this.state.group === false) {
      return (
        <div className="question">
          <ImageAndTextQuestion
            title="What is Better for a Breakup?"
            totalVoteCount="12,000"
          />{" "}
          {/* <ImageQuestion /> */} {/* <TextQuestion /> */} <br /> <br />
          <div className="timer">
            <Typography>
              {this.state.seconds}
              {/* {this.state.votes} */}{" "}
            </Typography>{" "}
          </div>{" "}
          <br />
          <Options />
        </div>
      );
    } else {
      return (
        <div>
          <div className="question">
            <ImageAndTextQuestion
              title="What is Better for a Breakup?"
              totalVoteCount="12,000"
            />{" "}
            {/* <ImageQuestion /> */} {/* <TextQuestion /> */} <br /> <br />
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
              className="timer"
            >
              <Grid item>
                <Typography>
                  {this.state.seconds}
                  {/* {this.state.votes} */}{" "}
                </Typography>{" "}
              </Grid>
              <Grid item className="circularProgressWrapper">
                <CircularProgress size={36} className="circularProgress" />
              </Grid>
            </Grid>{" "}
            <br />
            <Options />
          </div>{" "}
        </div>
      );
    }
  }
}
