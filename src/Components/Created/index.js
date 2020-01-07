import React, { Component } from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import { StringFormat } from "../../Helpers/capitalise";

import "./created.css";

export default class Created extends Component {
 

  render() {
    const{title,option1,option2,votes1,votes2}=this.props;
    return (
      <div className="createProfile">
        <Card className="cardProfile">
          <CardHeader
            title={StringFormat.capitalise(title)}
          />
          <div>
            {option1} = {votes1}
            {option2} = {votes2}
            Total Votes = {votes1+votes2}
          </div>
        </Card>{" "}
      </div>
    );
  }
}
