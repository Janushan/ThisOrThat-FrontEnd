import React, { Component } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import { Typography } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import "./profileToT.css";
import Grid from "@material-ui/core/Grid";

import { lighten, makeStyles, withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

import { StringFormat } from "../../Helpers/capitalise";

import ImageAndTextQuestionOption from "./imageAndTextOption";

const BorderLinearProgress = withStyles({
  root: {
    height: 10,
    backgroundColor: lighten("#a6a6a6", 0.5)
  },
  bar: {
    borderRadius: 20,
    backgroundColor: "#22ba00"
  }
})(LinearProgress);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  margin: {
    margin: theme.spacing(1)
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

export default class ProfileToT extends Component {
  state = {
    questionState: {
      questionId: ""
    },
    title: "",
    image1: null,
    image2: null,
    text1: "",
    text2: "",
    url1: "",
    url2: "",

    option1Votes: 8,
    option2Votes: 5,
    totalVotes: 13
  };

  componentDidMount() {
    this.updateQuestionState();
  }

  updateQuestionState = () => {
    var retrievedQuestionState = this.props.getQuestionState();
    console.log("Question state comes here:");
    console.log(retrievedQuestionState);
    console.log("Question state comes here:");
    this.setState(
      {
        questionState: retrievedQuestionState
      },
      () => {
        console.log(this.state.questionState);
        this.getQuestionDetails(this.state.questionState.questionId);
      }
    );
  };

  getQuestionDetails(questionId) {
    axios
      .get("http://thisorthat-260419.appspot.com/api/questions/" + questionId)
      .then((response) => {
        this.setState({
          title: response.data.questionText,
          text1: response.data.option1.text,
          text2: response.data.option2.text,
          option1Votes: parseFloat(response.data.option1.numberOfVotes),
          option2Votes: parseFloat(response.data.option2.numberOfVotes),
          totalVotes: parseFloat(
            response.data.option1.numberOfVotes +
              response.data.option2.numberOfVotes
          )
        });
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
        console.log("question details:");
        console.log(response.data);
      })
      .catch(function(error) {
        console.log("No reponse: " + error);
      });
  }

  comp;

  render() {
    var percentage1 = 0;
    var percentage2 = 0;
    if (this.state.totalVotes !== 0) {
      percentage1 = (
        100 *
        (this.state.option1Votes / this.state.totalVotes)
      ).toFixed(2);
      percentage2 = (
        100 *
        (1 - this.state.option1Votes / this.state.totalVotes)
      ).toFixed(2);
    }

    return (
      <div className="question">
        <Card className="card imageAndTextCard">
          <CardHeader title={StringFormat.capitalise(this.state.title)} />{" "}
          <div className="row"> </div> <br />
          <div className="options">
            <ImageAndTextQuestionOption
              cardContainerClass="cardContainerButtonLeft"
              image={this.state.url1}
              handleClick={(e) => this.incrementChoice1(e)}
              option="A"
              label={this.state.text1}
              percentage={percentage1}
            />{" "}
            <ImageAndTextQuestionOption
              cardContainerClass="cardContainerButton"
              image={this.state.url2}
              handleClick={this.incrementChoice2}
              option="B"
              label={this.state.text2}
              percentage={percentage2}
            />{" "}
          </div>{" "}
          <Grid className="cardCaptionVotes">
            <Typography variant="caption">
              {" "}
              {this.state.totalVotes}
              votes{" "}
            </Typography>{" "}
          </Grid>{" "}
        </Card>{" "}
      </div>
      // <div className="holder">
      //   <Card className="totInProfile" raised>
      //     <div>
      //       <CardHeader title={this.state.title} />
      //       <br />
      //       <br />
      //       <div className="parts">
      //         <div className="part1">
      //           <img className="image" alt="" src={this.state.url1} />
      //           <CardContent>
      //             <Typography gutterBottom variant="h5" component="h2">
      //               {this.state.text1}
      //             </Typography>
      //           </CardContent>
      //           <CustomizedProgressBars percent={percentage1} />
      //           <Typography gutterBottom variant="subtitle2">
      //             {percentage1 + "%"}
      //           </Typography>
      //         </div>
      //         <div className="part2">
      //           <img className="image" alt="" src={this.state.url2} />
      //           <CardContent>
      //             <Typography gutterBottom variant="h5" component="h2">
      //               {this.state.text2}
      //             </Typography>
      //           </CardContent>
      //           <CustomizedProgressBars percent={percentage2} />
      //           <Typography gutterBottom variant="subtitle2">
      //             {percentage2 + "%"}
      //           </Typography>
      //         </div>
      //       </div>
      //       <Typography gutterBottom variant="subtitle2">
      //         {this.state.totalVotes + " votes in total."}
      //       </Typography>
      //       <br />
      //       <br />
      //       <Button
      //         onClick={function() {
      //           window.location.href = "/question";
      //         }}
      //         variant="contained"
      //         color="primary"
      //       >
      //         Next ToT
      //       </Button>
      //     </div>
      //   </Card>
      // </div>
    );
  }
}
