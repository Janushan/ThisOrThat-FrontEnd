import React, { Component } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import VoucherCard from "./card";
import "./voucher.css";

export default class Voucher extends Component {
  state = {
    percentage: "15",
    logo: "https://bit.ly/2s0n8GF",
    terms: "30",
    image: "https://bit.ly/2s0n8GF",
    website: "www.ae.co.uk",
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

  // save = (e) => {
  //   axios.post(
  //     "https://thisorthat-260419.appspot.com/api/",
  //     {
  //       percentageDiscount: this.state.email,
  //       discountTerms: this.state.terms,
  //       imageURL: this.state.image,
  //       voucherCode: this.state.code,
  //       description: this.state.description,
  //       logoURL: this.state.logo
  //     },
  //     {
  //       headers: {}
  //     }
  //   );
  // };

  render() {
    return (
      <div class="row">
        <div class="column">
          <Grid container>
            <Card className="voucher" raised>
              <CardHeader title="Create Voucher" />
              <Grid container>
                <Grid item className="percenage">
                  <TextField
                    label="Discount Percentage (%)"
                    variant="outlined"
                    name="percentage"
                    value={this.state.percentage}
                    onChange={(e) => this.change(e)}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Discount Terms ()"
                    variant="outlined"
                    name="terms"
                    value={this.state.terms}
                    onChange={(e) => this.change(e)}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item className="percenage">
                  <TextField
                    label="Image URL"
                    variant="outlined"
                    name="image"
                    value={this.state.image}
                    onChange={(e) => this.change(e)}
                  />
                </Grid>
                <TextField
                  label="Website URL"
                  variant="outlined"
                  name="website"
                  value={this.state.website}
                  onChange={(e) => this.change(e)}
                />
              </Grid>
              <Grid container>
                <Grid item className="percenage">
                  <TextField
                    label="Description"
                    variant="outlined"
                    name="description"
                    value={this.state.description}
                    onChange={(e) => this.change(e)}
                  />
                </Grid>
                <TextField
                  className="code"
                  label="Code"
                  variant="outlined"
                  name="code"
                  value={this.state.code}
                  onChange={(e) => this.change(e)}
                />
              </Grid>
              <Button color="primary" onClick={(e) => this.open(e)}>
                {this.state.pay}
              </Button>
            </Card>
          </Grid>
        </div>
        <div class="column">
          <VoucherCard
            percentage={this.state.percentage}
            logo={this.state.logo}
            terms={this.state.terms}
            image={this.state.image}
            website={this.state.website}
            description={this.state.description}
            code={this.state.code}
          />
        </div>
      </div>
    );
  }
}
