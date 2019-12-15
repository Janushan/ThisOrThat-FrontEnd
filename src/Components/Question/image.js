import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import { Typography } from "@material-ui/core";

import Image1 from "../../Assets/pizza.jpg";
import Image2 from "../../Assets/ice-cream.jpg";

import "./question.css";

export default class ImageQuestion extends Component {
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
        {/* Tot with only text{" "} */}{" "}
        {/* {this.state.title}{this.state.option1}{this.state.option2}{this.state.votes} */}{" "}
        {/* ToT with only images */}
        <Card className="imageCard" raised>
          <CardHeader title="What is Better for a Breakup?" />
          <div className="row">
            <img
              className="image1"
              src={Image1}
              onClick={(e) => this.incrementChoice1(e)}
            />{" "}
            <img
              className="image2"
              src={Image2}
              onClick={(e) => this.incrementChoice2(e)}
            />{" "}
          </div>{" "}
          <br />
          <Typography variant="caption">Number of votes:</Typography>{" "}
        </Card>{" "}
      </div>
    );
  }
}
