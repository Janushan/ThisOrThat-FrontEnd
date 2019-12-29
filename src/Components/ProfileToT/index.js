import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import { Typography } from "@material-ui/core";
import "./profileToT.css";

export default class ProfileToT extends Component {

  render() {
    const { title, votes} = this.props;
    return (
      <div className="question">
        {" "}
        <Card className="textCard" raised>
            <CardHeader title={title} />
            <Button className="results" onClick={(e) => this.getResults(e)}>
                Get Results
            </Button>
            <br />
            <Typography variant="caption">
                Number of votes: {votes}
            </Typography>
        </Card>{" "}
      </div>
    );
  }
}