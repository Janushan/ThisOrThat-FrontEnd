import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import TurnedInIcon from "@material-ui/icons/TurnedIn";
import TurnedInNotIcon from "@material-ui/icons/TurnedInNot";
import ShareSharpIconButton from "@material-ui/icons/ShareSharp";
import FacebookIcon from "@material-ui/icons/Facebook";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import SimpleDialog from "./simpleDialog";

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
              <ShareSharpIconButton onClick={(e) => this.share(e)} />
            </IconButton>
            <Dialog open={this.state.open} onClose={this.handleClose}>
              <DialogTitle>{"Share This or That"}</DialogTitle>
              <DialogContent>
                <IconButton className="facebookIconButton">
                  <FacebookIcon onClick={(e) => this.share(e)} />
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
