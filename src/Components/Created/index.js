import React, { Component } from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import { StringFormat } from "../../Helpers/capitalise";
import ImageAndTextQuestionOption from "../Question/imageAndTextOption";

import "./created.css";

export default class Created extends Component {
  render() {
    const {
      title,
      option1,
      option2,
      votes1,
      votes2,
      image1,
      image2,
      totalVotes
    } = this.props;

    var percentage1 = 0;
    var percentage2 = 0;
    if (totalVotes !== 0) {
      percentage1 = (100 * (votes1 / votes2)).toFixed(0);
      percentage2 = (100 * (1 - votes1 / votes2)).toFixed(0);
    }

    return (
      <div className="question">
        <Card className="card imageAndTextCard">
          <CardHeader title={StringFormat.capitalise(title)} />{" "}
          <div className="row"> </div> <br />
          <div className="options">
            <ImageAndTextQuestionOption
              cardContainerClass="cardContainerLeft"
              image={image1}
              option="A"
              label={option1}
              percentage={percentage1}
            />{" "}
            <ImageAndTextQuestionOption
              cardContainerClass="cardContainer"
              image={image2}
              option="B"
              label={option2}
              percentage={percentage2}
            />{" "}
          </div>{" "}
          <Grid className="cardCaptionVotes">
            <Typography variant="caption">
              {" "}
              {totalVotes}
              votes{" "}
            </Typography>{" "}
          </Grid>{" "}
        </Card>{" "}
        <br />
      </div>
    );
  }
}
