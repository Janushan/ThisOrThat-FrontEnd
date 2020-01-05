import React, { Component } from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

import Image1 from "../../Assets/pizza.jpg";
import Image2 from "../../Assets/ice-cream.jpg";

import "./styles.css";

export default class ImageAndTextQuestion extends Component {
  incrementChoice1 = (e) => {
    axios.post('https://thisorthat-260419.appspot.com/questions/' + this.props.parent.questionId + '/' + this.props.parent.userId, {
      selectedOption: 1
    })
      .then(response => {
        window.location.href = "/profiletot";
    })
  }

  incrementChoice2 = (e) => {
    axios.post('https://thisorthat-260419.appspot.com/questions/' + this.props.parent.questionId + '/' + this.props.parent.userId, {
      selectedOption: 2
    })
      .then(response => {
        window.location.href = "/profiletot";
    })
  }

  render() {
    return (
      <div className="question">
        <Card className="card imageAndTextCard">
          <CardHeader title={this.props.parent.title} />
          <div className="row"> </div> <br />
          <div className="options">
            <Grid container direction="column" alignItems="center">
              <Grid item className="cardContainerLeft">
                <img
                  className="image"
                  src={this.props.parent.url1}
                  onClick={(e) => this.incrementChoice1(e)}
                  alt="img1"
                />{" "}
                <Typography className="cardCaptionText"> {this.props.parent.text1} </Typography>{" "}
              </Grid>{" "}
            </Grid>{" "}
            <Grid container direction="column" alignItems="center">
              <Grid item className="cardContainer">
                <img
                  className="image"
                  src={this.props.parent.url2}
                  onClick={(e) => this.incrementChoice2(e)}
                  alt="img2"
                />{" "}
                <Typography className="cardCaptionText"> {this.props.parent.text2} </Typography>{" "}
              </Grid>{" "}
            </Grid>{" "}
          </div>{" "}
          <Typography variant="caption"> {this.props.parent.numberOfVotes} votes </Typography>{" "}
        </Card>{" "}
      </div>
    );
  }
}
