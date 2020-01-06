import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

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

    const capitalise = (string) => {
      if (typeof string !== "string") return "";
      return string.charAt(0).toUpperCase() + string.slice(1);
    };
    return (
      <div className="options">
        <Grid container direction="column" alignItems="center">
          <Grid item className={cardContainerClass}>
            <img className="image" src={image} onClick={handleClick} alt="" />{" "}
            <Grid className="cardCaptionTextContainer">
              <Grid className="cardCaptionOptionContainer">
                <Typography className="cardCaptionOption">
                  {" "}
                  {option}{" "}
                </Typography>{" "}
              </Grid>{" "}
              <Typography className="cardCaptionText">
                {" "}
                {capitalise(label)}{" "}
              </Typography>{" "}
            </Grid>{" "}
          </Grid>{" "}
        </Grid>{" "}
      </div>
    );
  }
}
