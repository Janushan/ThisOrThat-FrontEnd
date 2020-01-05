import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import { Typography } from "@material-ui/core";
import CardContent from '@material-ui/core/CardContent';
import "./profileToT.css";

import Image1 from "../../Assets/pizza.jpg";
import Image2 from "../../Assets/ice-cream.jpg";

import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';



const BorderLinearProgress = withStyles({
  root: {
    height: 10,
    backgroundColor: lighten('#a6a6a6', 0.5),
  },
  bar: {
    borderRadius: 20,
    backgroundColor: '#22ba00',
  },
})(LinearProgress);


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  margin: {
    margin: theme.spacing(1),
  },
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

export default class ProfileToT extends Component {
  state = {
    title: "",
    text1: "Pizza",
    text2: "Ice-Cream",
    image1: null,
    image2: null,
    option1Votes: 8,
    option2Votes: 5,
    totalVotes: 13
  }


  comp

  render() {
    var percentage1 = (100 * (this.state.option1Votes / this.state.totalVotes)).toFixed(2);
    var percentage2 = (100 * (1 - this.state.option1Votes / this.state.totalVotes)).toFixed(2);
    return (
      <div className='holder'>
        <Card className="totInProfile" raised>
          <div>
            <CardHeader title="What is Better for a Breakup" />
            <br />
            <br />
            <div classname="parts">
              <div className="part1">
                <img className="image" src={Image1}/>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {this.state.text1}
                  </Typography>
                </CardContent>
                <CustomizedProgressBars percent={percentage1} />
                <Typography gutterBottom variant="subtitle2" component="subtitle2">
                  {percentage1 + "%"}
                </Typography>
              </div>
              <div className="part2">
                <img className="image" src={Image2} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {this.state.text2}
                  </Typography>
                </CardContent>
                <CustomizedProgressBars percent={percentage2} />
                <Typography gutterBottom variant="subtitle2" component="subtitle2">
                  {percentage2 + "%"}
                </Typography>
              </div>
            </div>
            <Typography gutterBottom variant="subtitle2" component="subtitle2">
              {this.state.totalVotes + " votes in total."}
            </Typography>
            <br /><br />
            <Button onClick={function () {window.location.href = "/question"}} variant="contained" color="primary" >
              Next ToT
            </Button>
          </div>
        </Card>
      </div>
    );
  }
}