import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import TurnedInIcon from "@material-ui/icons/TurnedIn";
import TurnedInNotIcon from "@material-ui/icons/TurnedInNot";
import ShareSharpIconButton from "@material-ui/icons/ShareSharp";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

import "./styles.css";

export default class Options extends Component {
  constructor() {
    super();
  }

  state = {
    saved: false
  };

  save = (e) => {
    this.setState({ saved: true });
    console.log("Save");
  };

  unsave = (e) => {
    this.setState({ saved: false });
    console.log("Unsave");
  };

  share = (e) => {
    console.log("Share");
  };

  render() {
    return (
      <div className="options">
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <IconButton className="iconButton">
              {this.state.saved ? (
                <TurnedInIcon onClick={(e) => this.unsave(e)} />
              ) : (
                <TurnedInNotIcon onClick={(e) => this.save(e)} />
              )}
            </IconButton>
          </Grid>{" "}
          <Grid item>
            <Typography>Save</Typography>
          </Grid>{" "}
        </Grid>{" "}
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <IconButton className="iconButton">
              <ShareSharpIconButton onClick={(e) => this.share(e)} />
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
