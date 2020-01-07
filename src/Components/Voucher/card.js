import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import "./voucher.css";

export default class VoucherCard extends Component {
  state = {
    percentage: "15",
    logo: "https://bit.ly/2s0n8GF",
    terms: "30",
    image: "https://bit.ly/2s0n8GF",
    website: "https://pullandbear.co.uk",
    description:
      "Copy your voucher code to get 15% off your next pair of ripped jeans.",
    code: "15OFF",
    open: true,
    pay: "Pay and Publish"
  };

  change = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  open = (e) => {
    this.setState({
      open: true
    });
  };

  copy = (e) => {
    var dummy = document.createElement("input");
    document.body.appendChild(dummy);
    dummy.setAttribute("value", this.state.code);
    console.log(dummy);
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  };

  render() {
    return (
      <div>
        <Card className="voucherRoot">
          <Grid container alignItems="center">
            <Grid item>
              <img
                className="voucherBrandLogo"
                src="https://bit.ly/2s0n8GF"
                alt="sad"
              />
            </Grid>
            <Grid item justify="center">
              <Typography variant="h6" className="voucherOffer">
                {"Get " + this.state.percentage + "% Off"}
              </Typography>
              <Typography className="voucherdiscountTerms">
                {"Orders over " +
                  "£" +
                  this.state.terms +
                  " at " +
                  this.state.website}
              </Typography>
            </Grid>
          </Grid>
          <div className="voucherLine" />
          <Grid container alignItems="center">
            <Grid item>
              <img
                className="voucherImage"
                src="https://bit.ly/2s0n8GF"
                alt="sad"
              />
            </Grid>
            <Grid item>
              <Grid container className="voucherOfferContainer">
                <Grid item>
                  <Typography className="voucherDescription">
                    {this.state.description}
                  </Typography>
                </Grid>
                <Grid item>
                  <ButtonGroup size="small">
                    <Button
                      className="voucherCodeButton"
                      disableRipple={true}
                      disableFocusRipple={true}
                      onClick={(e) => this.copy(e)}
                    >
                      <Typography variant="h5">{this.state.code}</Typography>
                    </Button>
                    <Button onClick={(e) => this.copy(e)}>Copy</Button>
                  </ButtonGroup>
                  <Button color="primary"></Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </div>
    );
  }
}
