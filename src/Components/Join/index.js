import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import './join.css';

export default class Question extends Component {

    state={
        tot:""
    }

    onChange= e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    submit= e => {
        window.location.href = "/question";
    }

    render() {
        return (
            <div className='holder'>
                <Card className="join" raised>
                    <CardHeader title="Join a ToT" />
                    <br/> 
                    <TextField 
                        className="totCode" 
                        label="Enter Code" 
                        variant="outlined" 
                        name='tot'
                        value={this.state.tot}
                        onChange={e => this.onChange(e)}
                    />
                    <br/>
                    <Button variant="contained" color="primary" onClick={e => this.submit(e)}>
                        Submit
                    </Button>
                </Card> 
            </div>
            
        )
    }
}