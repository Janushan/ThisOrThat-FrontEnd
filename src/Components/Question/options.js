import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import TurnedInIcon from "@material-ui/icons/TurnedIn";
import TurnedInNotIcon from "@material-ui/icons/TurnedInNot";
import ShareSharpIconButton from "@material-ui/icons/ShareSharp";
import FacebookIcon from "@material-ui/icons/Facebook";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import "./styles.css";

export default class Options extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: null,
      open: false,
      setOpen: false
    };
    this.share = this.share.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  save = (e) => {
    this.setState({ saved: true });
    console.log("Save");
  };

  unsave = (e) => {
    this.setState({ saved: false });
    console.log("Unsave");
  };

  share = (e) => {
    this.setState({ open: true });
    console.log("Share");
  };

  facebookShare = (e) => {
    window.FB.ui(
      {
        method: "share",
        href: "https://developers.facebook.com/docs/"
      },
      function(response) {}
    );
  };

  handleClose() {
    this.setState({ open: false });
    // this.setState({ setSelectedValue: value });
  }

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
              <SkipNextIcon onClick={console.log("skip")} />
            </IconButton>
          </Grid>{" "}
          <Grid item>
            <Typography>Skip</Typography>
          </Grid>{" "}
        </Grid>{" "}
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <IconButton className="iconButton" onClick={(e) => this.share(e)}>
              <ShareSharpIconButton />
            </IconButton>
            <Dialog open={this.state.open} onClose={this.handleClose}>
              <DialogTitle>{"Share This or That"}</DialogTitle>
              <DialogContent>
                <IconButton className="facebookIconButton">
                  <FacebookIcon onClick={(e) => this.facebookShare(e)} />
                </IconButton>
              </DialogContent>
              {/* <DialogActions>
                <Button autoFocus onClick={this.handleClose} color="primary">
                  Disagree
                </Button>
                <Button onClick={this.handleClose} color="primary" autoFocus>
                  Agree
                </Button>
              </DialogActions> */}
            </Dialog>
          </Grid>{" "}
          <Grid item>
            <Typography>Share</Typography>
          </Grid>{" "}
        </Grid>{" "}
      </div>
    );
  }
}
