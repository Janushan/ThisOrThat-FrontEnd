import React, { Component } from "react";
import axios from "axios";
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
    userId: "...",
    questionId: "",
    title: "...",
    text1: "...",
    text2: "...",
    url1: "",
    url2: "",
    numberOfVotes: 0,
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
        window.location.href = "/profiletot";
      }
    }, 1000);

    this.updateStateFromAPICall();
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  updateStateFromAPICall = () => {
    this.setState(
      {
        userId: this.props.userId
      },
      () => {
        axios
          .get(
            "https://thisorthat-260419.appspot.com/users/" +
              this.state.userId +
              "/feed"
          )
          .then((response) => {
            console.log("response on next line");
            console.log(response.data);
            console.log(response.data.id);
            console.log("response on previous line");
            this.setState(
              {
                questionId: response.data.id,
                title: response.data.questionText,
                text1: response.data.option1.text,
                text2: response.data.option2.text,
                numberOfVotes:
                  response.data.option1.numberOfVotes +
                  response.data.option2.numberOfVotes
              },
              function() {
                this.props.setQuestionState(this.state);
              }
            );
            if (response.data.option1.imageURL) {
              this.setState({
                url1: response.data.option1.imageURL
              });
            }
            if (response.data.option2.imageURL) {
              this.setState({
                url2: response.data.option2.imageURL
              });
            }

            console.log("at least we tried");
          })
          .catch(function(error) {
            console.log("No reponse: " + error);
          });
      }
    );
  };

  render() {
    if (this.state.group === false) {
      return (
        <div className="question">
          <ImageAndTextQuestion /> {/* <ImageQuestion /> */}{" "}
          {/* <TextQuestion /> */} <br /> <br />
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
            <ImageAndTextQuestion parent={this.state} />{" "}
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
            <Options parent={this.state} />
          </div>{" "}
        </div>
      );
    }
  }
}
