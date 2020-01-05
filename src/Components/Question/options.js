import React, { Component } from "react";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import TurnedInIcon from "@material-ui/icons/TurnedIn";
import TurnedInNotIcon from "@material-ui/icons/TurnedInNot";
import ShareSharpIconButton from "@material-ui/icons/ShareSharp";
import FacebookIcon from "@material-ui/icons/Facebook";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

import "./styles.css";

export default class Options extends Component {
  state = {
    saved: false
  }

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
    axios.post('https://thisorthat-260419.appspot.com/questions/' + this.props.parent.questionId + '/' + this.props.parent.userId + '/save', {
    })
      .then(response => {
        console.log("ToT saved.")
    })

    this.setState({ saved: true });
    console.log("Save");
  };

  unsave = (e) => {
    axios.post('https://thisorthat-260419.appspot.com/questions/' + this.props.parent.questionId + '/' + this.props.parent.userId + '/save', {
    })
      .then(response => {
        console.log("ToT unsaved.")
    })

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

  componentDidMount() {
    this.getSavedQuestions();
  }

  getSavedQuestions() {
    var savedQuestions = [];

    axios.get('https://thisorthat-260419.appspot.com/users/' + this.props.parent.userId + '/saved').then((response) => {
      console.log(this.props.parent.userId);
      console.log("saved:");
      console.log(response.data);
      
    })
    .catch(function (error) {
      console.log("something went wrong: " + error);
    });

    if(savedQuestions.includes(this.props.parent.questionId)) {
      this.setState({ saved: true });
    } else {
      this.setState({ saved: false });
    }
  }

  render() {
    return (
      <div className="options">
        <Grid container direction="column" alignItems="center">
          <Grid item>
            {this.state.saved === true ? (
              <IconButton className="iconButton" onClick={(e) => this.unsave(e)} >
                <TurnedInIcon />
              </IconButton>
            ) : (
              <IconButton className="iconButton" onClick={(e) => this.save(e)} >
                <TurnedInNotIcon />
              </IconButton>
            )}
          </Grid>{" "}
          <Grid item>
            {this.state.saved === true ? (
              <Typography>Unsave</Typography>
            ) : (
              <Typography>Save</Typography>
            )}
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
