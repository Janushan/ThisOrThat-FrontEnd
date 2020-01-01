import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TurnedInIcon from "@material-ui/icons/TurnedIn";
import ShareSharpIconButton from "@material-ui/icons/ShareSharp";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

import "./styles.css";

export default class Options extends Component {
  save = (e) => {
    console.log("Save");
  };

  share = (e) => {
    console.log("Share");
  };

  render() {
    return (
      <div className="options">
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <IconButton className="iconButton" onClick={(e) => this.save(e)} >
              <TurnedInIcon />
            </IconButton>
          </Grid>{" "}
          <Grid item>
            <Typography>Save</Typography>
          </Grid>{" "}
        </Grid>{" "}
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <IconButton className="iconButton" onClick={(e) => this.share(e)} >
              <ShareSharpIconButton />
            </IconButton>
          </Grid>{" "}
          <Grid item>
            <Typography>Share</Typography>
          </Grid>{" "}
        </Grid>{" "}
      </div>
    );
  }
}
