import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

import Image1 from "../../Assets/pizza.jpg";
import Image2 from "../../Assets/ice-cream.jpg";

import "./styles.css";

export default class ImageAndTextQuestion extends Component {
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

  save = (e) => {
    console.log("Save");
  };

  share = (e) => {
    console.log("Share");
  };

  render() {
    //const { title, option1, option2} = this.props;
    return (
      <div className="question">
        <Card className="card imageAndTextCard">
          <CardHeader
            classes="cardTitle"
            title="What is Better for a Breakup?"
          />
          <div className="row"> </div> <br />
          <div className="options">
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <img
                  className="image image1"
                  src={Image1}
                  onClick={(e) => this.incrementChoice1(e)}
                />{" "}
              </Grid>{" "}
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => this.incrementChoice1(e)}
                >
                  {" "}
                  Pizza{" "}
                </Button>{" "}
              </Grid>{" "}
            </Grid>{" "}
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <img
                  className="image"
                  src={Image2}
                  onClick={(e) => this.incrementChoice2(e)}
                />{" "}
              </Grid>{" "}
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => this.incrementChoice2(e)}
                >
                  {" "}
                  Ice - cream{" "}
                </Button>{" "}
              </Grid>{" "}
            </Grid>{" "}
          </div>{" "}
          <Typography variant="caption"> Number of votes: </Typography>{" "}
        </Card>{" "}
      </div>
    );
  }
}
