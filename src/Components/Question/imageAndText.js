import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

import ImageAndTextQuestionOption from "./imageAndTextOption";

import Image1 from "../../Assets/pizza.jpg";
import Image2 from "../../Assets/ice-cream.jpg";

import "./styles.css";

export default class ImageAndTextQuestion extends Component {
  state = {
    choice1: 0,
    choice2: 0,
    votes: 0,
    seconds: 10
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

  incrementChoice1 = (e) => {
    this.setState(
      {
        choice1: this.state.choice1 + 1,
        votes: this.state.votes + 1
      },
      function() {
        console.log("Click1");
        window.location.href = "/profiletot";
      }
    );
  };

  incrementChoice2 = (e) => {
    this.setState(
      {
        choice2: this.state.choice2 + 1,
        votes: this.state.votes + 1
      },
      function() {
        console.log("Click2");
        window.location.href = "/profiletot";
      }
    );
  };

  save = (e) => {
    console.log("Save");
  };

  share = (e) => {
    console.log("Share");
  };

  render() {
    const { title, totalVoteCount } = this.props;
    return (
      <div className="question">
        <Card className="card imageAndTextCard">
          <CardHeader title={title} />
          <div className="row"> </div> <br />
          <div className="options">
            <ImageAndTextQuestionOption
              cardContainerClass="cardContainerButtonLeft"
              image={Image1}
              handleClick={this.incrementChoice1}
              option="A"
              label="Pizza"
            />
            <ImageAndTextQuestionOption
              cardContainerClass="cardContainerButton"
              image={Image2}
              handleClick={this.incrementChoice2}
              option="B"
              label="Ice Cream"
            />
          </div>{" "}
          <Grid className="cardCaptionVotes">
            <Typography variant="caption"> {totalVoteCount} votes </Typography>{" "}
          </Grid>
        </Card>{" "}
      </div>
    );
  }
}
