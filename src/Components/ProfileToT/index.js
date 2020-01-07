import React, { Component } from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import { StringFormat } from "../../Helpers/capitalise";
import Options from "../Question/options";
import ImageAndTextQuestionOption from "../Question/imageAndTextOption";
import VoucherCard from "../Voucher/card";

import "./profileToT.css";

export default class ProfileToT extends Component {
  state = {
    questionState: {
      questionId: ""
    },
    title: "",
    image1: null,
    image2: null,
    text1: "",
    text2: "",
    url1: "",
    url2: "",
    isSponsored: false,

    percentage: "",
    logo: "",
    terms: "",
    image: "",
    website: "",
    description: "",
    code: "",

    option1Votes: 8,
    option2Votes: 5,
    totalVotes: 13
  };

  componentDidMount() {
    this.updateQuestionState();
  }

  updateQuestionState = () => {
    var retrievedQuestionState = this.props.getQuestionState();
    console.log("Question state comes here:");
    console.log(retrievedQuestionState);
    console.log("Question state comes here:");
    this.setState(
      {
        questionState: retrievedQuestionState
      },
      () => {
        console.log(this.state.questionState);
        this.getQuestionDetails(this.state.questionState.questionId);
      }
    );
  };

  getQuestionDetails(questionId) {
    axios
      .get(
        "https://thisorthat-260419.appspot.com/api/questions/" + questionId,
        { withCredentials: true }
      )
      .then((response) => {
        this.setState({
          isSponsored: response.data.isSponsored,
          title: response.data.questionText,
          text1: response.data.option1.text,
          text2: response.data.option2.text,
          option1Votes: parseFloat(response.data.option1.numberOfVotes),
          option2Votes: parseFloat(response.data.option2.numberOfVotes),

          percentage: response.data.sponsoredData.percentage,
          logo: response.data.sponsoredData.logo,
          terms: response.data.sponsoredData.terms,
          image: response.data.sponsoredData.image,
          website: response.data.sponsoredData.website,
          description: response.data.sponsoredData.description,
          code: response.data.sponsoredData.code,

          totalVotes: parseFloat(
            response.data.option1.numberOfVotes +
              response.data.option2.numberOfVotes
          )
        });
        if (response.data.option1.imageURL) {
          this.setState({
            url1: response.data.option1.imageURL
          });
        }
        if (response.data.option2.imageURL) {
          this.setState({
            url2: response.data.option2.imageURL
          });
        }
        console.log("question details:");
        console.log(response.data);
      })
      .catch(function(error) {
        console.log("No reponse: " + error);
      });
  }

  render() {
    var percentage1 = 0;
    var percentage2 = 0;
    if (this.state.totalVotes !== 0) {
      percentage1 = (
        100 *
        (this.state.option1Votes / this.state.totalVotes)
      ).toFixed(0);
      percentage2 = (
        100 *
        (1 - this.state.option1Votes / this.state.totalVotes)
      ).toFixed(0);
    }

    return (
      <div className="question">
        <Card className="card imageAndTextCard">
          <CardHeader title={StringFormat.capitalise(this.state.title)} />{" "}
          {this.state.isSponsored === true ? (
            <Grid container justify="center">
              <Typography className="sponsorTag">Sponsored</Typography>
            </Grid>
          ) : (
            <div></div>
          )}
          <div className="row"> </div> <br />
          <div className="options">
            <ImageAndTextQuestionOption
              cardContainerClass="cardContainerLeft"
              image={this.state.url1}
              handleClick={(e) => this.incrementChoice1(e)}
              option="A"
              label={this.state.text1}
              percentage={percentage1}
            />{" "}
            <ImageAndTextQuestionOption
              cardContainerClass="cardContainer"
              image={this.state.url2}
              handleClick={this.incrementChoice2}
              option="B"
              label={this.state.text2}
              percentage={percentage2}
            />{" "}
          </div>{" "}
          <Grid className="cardCaptionVotes">
            <Typography variant="caption">
              {" "}
              {this.state.totalVotes}
              votes{" "}
            </Typography>{" "}
          </Grid>{" "}
        </Card>{" "}
        <br />
        {this.state.isSponsored === true ? (
          <VoucherCard
            percentage={this.state.percentage}
            logo={this.state.logo}
            terms={this.state.terms}
            image={this.state.image}
            website={this.state.website}
            description={this.state.description}
            code={this.state.code}
          />
        ) : (
          <div></div>
        )}
        <Options parent={this.state} /> <br />
      </div>
    );
  }
}
