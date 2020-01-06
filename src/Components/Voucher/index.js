import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FacebookIcon from "@material-ui/icons/Facebook";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import "./voucher.css";

export default class Voucher extends Component {
    state = {
        percentage: "15",
        logo:"",
        terms: "30",
        image: "",
        website:"https://pullandbear.co.uk",
        description:"Slim-fitted blue jeans",
        code:"15OFF",
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
        dummy.setAttribute('value', this.state.code);
        console.log(dummy);
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
      };

      save = (e) => {
        axios.post('https://thisorthat-260419.appspot.com/api/', {
            percentageDiscount: this.state.email,
            discountTerms: this.state.terms,
            imageURL:this.state.image,
            voucherCode:this.state.code,
            description: this.state.description,
            logoURL: this.state.logo
        })
      };

      render() {
        return (
            <div class="row">
                <div class="column">
                    <div className='holder'>
                        <Card className="voucher" raised>
                            <CardHeader title="Create Voucher" />
                            <div className="discounts">
                                <TextField
                                    className="percentage"
                                    label="Discount Percentage (%)"
                                    variant="outlined"
                                    name='percentage'
                                    value={this.state.percentage}
                                    onChange={e => this.change(e)}
                                />
                                <TextField
                                    className="terms"
                                    label="Discount Terms ()"
                                    variant="outlined"
                                    name='terms'
                                    value={this.state.terms}
                                    onChange={e => this.change(e)}
                                />
                            </div>
                            <TextField
                                className="voucherImage"
                                label="Image URL"
                                variant="outlined"
                                name='image'
                                value={this.state.image}
                                onChange={e => this.change(e)}
                            />
                            <TextField
                                className="website"
                                label="Website URL"
                                variant="outlined"
                                name='website'
                                value={this.state.website}
                                onChange={e => this.change(e)}
                            />
                            <TextField
                                className="description"
                                label="Description"
                                variant="outlined"
                                name='description'
                                value={this.state.description}
                                onChange={e => this.change(e)}
                            />
                            <TextField
                                className="code"
                                label="Code"
                                variant="outlined"
                                name='code'
                                value={this.state.code}
                                onChange={e => this.change(e)}
                            />
                            <Button onClick={e => this.open(e)}>
                                {this.state.pay}
                            </Button>
                        </Card>
                    </div>
                </div>
                <div class="column">
                    <Card>
                        <Typography variant="h5" display="block" gutterBottom >
                            {"Get "+this.state.percentage+"% Off"}
                        </Typography>
                        <Typography variant="caption" display="block" gutterBottom >
                            {"On orders over " + this.state.terms + " pounds @ " + this.state.website} 
                        </Typography>
                        <img className="voucherImage" src={this.state.image} alt="Preview" />
                        <Typography variant="h5" display="block" gutterBottom >
                            {this.state.description}
                        </Typography>
                        <br/>
                        <ButtonGroup size="small" aria-label="small outlined button group">
                            <Button onClick={e => this.copy(e)} >
                                <Typography variant="h5" display="block" gutterBottom >
                                    {this.state.code}
                                </Typography>
                            </Button>
                            <Button onClick={e => this.copy(e)} >Copy</Button>
                        </ButtonGroup>
                        <Button color="primary"></Button>
                        <Button onClick={e => this.save(e)} color="primary">
                            Save Voucher 
                        </Button>
                    </Card>
                </div>
            </div>
        );
    }
}