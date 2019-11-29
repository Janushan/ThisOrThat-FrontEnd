import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import SaveIconButton from '@material-ui/icons/Save';
import ShareSharpIconButton from '@material-ui/icons/ShareSharp';
import Grid from '@material-ui/core/Grid';
import Image1 from '../Assets/pizza.jpg';
import Image2 from '../Assets/ice-cream.jpg';
import './question.css';
import { Typography } from '@material-ui/core';


export default class Question extends Component {
  state={
    choice1:0,
    choice2:0,
    votes:0,
    seconds: 10
  }

  componentDidMount() {
    this.myInterval = setInterval(() => {
        const { seconds} = this.state
        if (seconds > 0) {
            this.setState(({ seconds }) => ({
                seconds: seconds - 1
            }))
        }
        if (seconds === 0) {
          clearInterval(this.myInterval)   
        } 
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.myInterval)
  }

  incrementChoice1= e =>{
    this.setState({choice1:(this.state.choice1+1)})
    this.setState({votes:(this.state.votes+1)})
    console.log("Click1");
  }

  incrementChoice2= e =>{
    this.setState({choice2:(this.state.choice2+1)})
    this.setState({votes:(this.state.votes+1)})
    console.log("Click2");
  }

  save= e =>{
    console.log("Save");
  }

  share= e =>{
    console.log("Share");
  }

  render() {
    //const { title, option1, option2} = this.props; 
    return (
        <div className="question" >
          
          {/* Tot with only text */}
          {/* <Card className="textCard" raised>
              <CardHeader title="What is Better for a Breakup?"  /> 
              <Button className="choices" onClick={e => this.incrementChoice1(e)}>Pizza</Button> 
              <br/>
              <Typography variant="caption">
                  or
              </Typography>
              <br/>
              <Button className="choices" onClick={e => this.incrementChoice2(e)}>Ice-Cream</Button>
              <br/>
              <Typography variant="caption">
                  Number of votes: 
              </Typography>
          </Card>  */}
          {/* {this.state.title}{this.state.option1}{this.state.option2}{this.state.votes} */}
          {/* ToT with only images
           <Card className="imageCard" raised>
              <CardHeader title="What is Better for a Breakup?" /> 
                  <div className="row">
                      <img className="image1" src={Image1}  onClick={e => this.incrementChoice1(e)} />
                      <img className="image2" src={Image2}  onClick={e => this.incrementChoice2(e)} />
                  </div>
                  <br/>
              <Typography variant="caption">
                  Number of votes:
              </Typography>
          </Card> */}

           <Card className="imageAndTextCard" raised>
              <CardHeader title="What is Better for a Breakup?" /> 
                  <div className="row">
                  </div>
                  <br/>
                  <div className='options'>
                    <Grid container direction="column" alignItems="center">
                        <Grid item>
                        <img className="image1" src={Image1}  onClick={e => this.incrementChoice1(e)} />                        
                        </Grid>
                        <Grid item>
                          <Button className='Button' onClick={e => this.incrementChoice1(e)}>Pizza</Button>
                        </Grid>
                    </Grid>
                    <Grid container direction="column" alignItems="center">
                        <Grid item>
                            <img className="image2" src={Image2}  onClick={e => this.incrementChoice2(e)} />
                        </Grid>
                        <Grid item>
                          <Button className='Button' onClick={e => this.incrementChoice2(e)}>Ice-cream</Button>
                        </Grid>
                    </Grid>
                  </div>
              <Typography variant="caption">
                  Number of votes:
              </Typography>
          </Card>
          <br/><br/>
          <div className='timer'>
              <Typography variant="caption">
                Next ToT in {this.state.seconds} seconds... {/* {this.state.votes} */}
              </Typography>
          </div>
          <br/>
          <div className='options'>
              <Grid container direction="column" alignItems="center">
                  <Grid item>
                    <SaveIconButton onClick={e => this.save(e)}/>
                  </Grid>
                  <Grid item>
                    <Button className='Button' onClick={e => this.save(e)}>Save</Button>
                  </Grid>
              </Grid>
              <Grid container direction="column" alignItems="center">
                  <Grid item>
                    <ShareSharpIconButton onClick={e => this.share(e)}/>
                  </Grid>
                  <Grid item>
                    <Button className='Button' onClick={e => this.share(e)}>Share</Button>
                  </Grid>
              </Grid>
          </div>
        </div>
    );
  }
}
