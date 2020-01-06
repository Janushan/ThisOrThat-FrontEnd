import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import { StringFormat } from "../../Helpers/capitalise";

import "./styles.css";

export default class ImageAndTextQuestionOption extends Component {
  render() {
    const {
      image,
      handleClick,
      option,
      label,
      cardContainerClass
    } = this.props;

    return (
      <div className="options">
        <Grid container direction="column" alignItems="center">
          <Grid item className={cardContainerClass}>
            <img className="image" src={image} onClick={handleClick} alt="" />{" "}
            <Grid className="cardCaptionTextContainer">
              <Grid className="cardCaptionOptionContainer">
                <Typography className="cardCaptionOption">
                  {" "}
                  {StringFormat.capitalise(option)}{" "}
                </Typography>{" "}
              </Grid>{" "}
              <Typography className="cardCaptionText">
                {" "}
                {StringFormat.capitalise(label)}{" "}
              </Typography>{" "}
            </Grid>{" "}
          </Grid>{" "}
        </Grid>{" "}
      </div>
    );
  }
}
