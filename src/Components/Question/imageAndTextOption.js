import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import { StringFormat } from "../../Helpers/capitalise";

import "./styles.css";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const BorderLinearProgress = withStyles({
  root: {
    marginTop: 4,
    height: 16,
    backgroundColor: "#FFF",
    borderRadius: 2
  },
  bar: {
    borderRadius: 0,
    backgroundColor: "#50E3C2"
  }
})(LinearProgress);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  }
}));

function CustomizedProgressBars({ percent }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BorderLinearProgress
        className={classes.margin}
        variant="determinate"
        color="secondary"
        value={percent}
      />
    </div>
  );
}

export default class ImageAndTextQuestionOption extends Component {
  render() {
    const {
      image,
      handleClick,
      option,
      label,
      cardContainerClass,
      percentage
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
            {percentage ? (
              <Grid className="resultsContainer">
                <CustomizedProgressBars percent={percentage} />
                <Typography className="percentage" variant="subtitle2">
                  {percentage + "%"}
                </Typography>
              </Grid>
            ) : (
              <div></div>
            )}
          </Grid>{" "}
        </Grid>{" "}
      </div>
    );
  }
}
