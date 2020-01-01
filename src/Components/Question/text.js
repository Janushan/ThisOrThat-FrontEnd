import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import { Typography } from "@material-ui/core";

import "./styles.css";

export default class TextQuestion extends Component {
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
    this.setState({
      choice1: this.state.choice1 + 1
    });
    this.setState({
      votes: this.state.votes + 1
    });
    console.log("Click1");
  };

  incrementChoice2 = (e) => {
    this.setState({
      choice2: this.state.choice2 + 1
    });
    this.setState({
      votes: this.state.votes + 1
    });
    console.log("Click2");
  };

  render() {
    //const { title, option1, option2} = this.props;
    return (
      <div className="question">
        {" "}
        {/* Tot with only text{" "} */}
        <Card className="textCard" raised>
          <CardHeader title="What is Better for a Breakup?" />
          <Button className="choices" onClick={(e) => this.incrementChoice1(e)}>
            Pizza
          </Button>
          <br />
          <Typography variant="caption">or</Typography>
          <br />
          <Button className="choices" onClick={(e) => this.incrementChoice2(e)}>
            Ice-Cream
          </Button>
          <br />
          <Typography variant="caption">Number of votes:</Typography>
        </Card>{" "}
        {/* {this.state.title}{this.state.option1}{this.state.option2}{this.state.votes} */}{" "}
      </div>
    );
  }
}
