import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import './creator.css';

export default class Question extends Component {

    state={
        title:"",
        text1:"",
        text2:"",
        image1: null,
        image2:null
    }

    onChange= e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    submit= e => {
        
    }

    render() {
        return (
            <div className='holder'>
                <Card className="creator" raised>
                    <CardHeader title="Create a ToT" /> 
                    <br/>
                    <TextField 
                        className="questionTitle" 
                        label="This or That" 
                        variant="outlined" 
                        name='title'
                        value={this.state.title}
                        onChange={e => this.onChange(e)}
                    />
                    <br/>
                    <TextField 
                        className="option1" 
                        label="Option 1" 
                        variant="outlined"
                        name='text1'
                        value={this.state.text1}
                        onChange={e => this.onChange(e)}
                        InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                                <IconButton>
                                    <ImageSearchIcon/>
                                </IconButton>
                              </InputAdornment>
                            ),
                        }}
                    />
                    <img
                        className="image"
                        src={this.state.image1}
                    />
                    <br/>
                    <Typography variant="caption">
                        or
                    </Typography>
                    <br/>
                    <TextField 
                        className="option2" 
                        label="Option 2" 
                        variant="outlined"
                        name='text2'
                        value={this.state.text2}
                        onChange={e => this.onChange(e)}
                        InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                                <IconButton>
                                    <ImageSearchIcon/>
                                </IconButton>
                              </InputAdornment>
                            ),
                        }}
                    />
                    <img
                        className="image"
                        src={this.state.image2}
                    />
                    <br/>
                    <div className="colorPanel">
                        <FiberManualRecordIcon className="colorChoice"/>
                        <FiberManualRecordIcon className="colorChoice"/>
                        <FiberManualRecordIcon className="colorChoice"/>
                        <FiberManualRecordIcon className="colorChoice"/>
                    </div>
                    
                    <br/>
                    <Button variant="contained" color="primary" onClick={e => this.submit(e)}>
                        Submit
                    </Button>
                </Card> 
            </div>
            
        )
    }
}
