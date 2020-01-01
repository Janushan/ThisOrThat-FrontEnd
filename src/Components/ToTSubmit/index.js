import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import './ToTSubmit.css';
import { CardContent } from '@material-ui/core';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
export default class Question extends Component {

    render() {
        return (
            <div className='holder'>
                <Card className="submit" raised>
                    <CardHeader 
                        avatar={<CheckCircleOutlineRoundedIcon />}
                        title="ToT Submitted" 
                    /> 
                    <CardContent>
                        After a short review, we'll post your ToT publicly.
                    </CardContent>
                </Card> 
            </div>
            
        )
    }
}