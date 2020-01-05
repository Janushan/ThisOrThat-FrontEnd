import React, { Component } from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

import ImageAndTextQuestionOption from "./imageAndTextOption";

import "./styles.css";

export default class ImageAndTextQuestion extends Component {
  incrementChoice1 = (e) => {
    axios
      .post(
        "https://thisorthat-260419.appspot.com/questions/" +
          this.props.parent.questionId +
          "/" +
          this.props.parent.userId,
        {
          selectedOption: 1
        }
      )
      .then((response) => {
        window.location.href = "/profiletot";
      });
  };

  incrementChoice2 = (e) => {
    axios
      .post(
        "https://thisorthat-260419.appspot.com/questions/" +
          this.props.parent.questionId +
          "/" +
          this.props.parent.userId,
        {
          selectedOption: 2
        }
      )
      .then((response) => {
        window.location.href = "/profiletot";
      });
  };

  render() {
    return (
      <div className="question">
        <Card className="card imageAndTextCard">
          <CardHeader title={this.props.parent.title} />
          <div className="row"> </div> <br />
          <div className="options">
            <ImageAndTextQuestionOption
              cardContainerClass="cardContainerButtonLeft"
              image={this.props.parent.url1}
              handleClick={(e) => this.incrementChoice1(e)}
              option="A"
              label={this.props.parent.text1}
            />
            <ImageAndTextQuestionOption
              cardContainerClass="cardContainerButton"
              image={this.props.parent.url2}
              handleClick={this.incrementChoice2}
              option="B"
              label={this.props.parent.text2}
            />
          </div>{" "}
          <Grid className="cardCaptionVotes">
            <Typography variant="caption">
              {" "}
              {this.props.parent.numberOfVotes} votes{" "}
            </Typography>{" "}
          </Grid>
        </Card>{" "}
      </div>
    );
  }
}
