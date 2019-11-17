import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import './question.css';
import { Typography } from '@material-ui/core';


export default class Question extends Component {

  render() {
    const { title, option1, option2} = this.props; 

    return (
      <div>
        <div className="question" >
          <Card className="questionCard" raised>
              <CardHeader
                    title="Which is Better for a Breakup?" 
              />
              <Button className="choices">Pizza</Button> 
              <br/>
              {/* {option1} */}
              <Typography variant="caption">
                  or
              </Typography>
              <br/>
              <Button className="choices">Ice-Cream</Button>
              {/* {option1} */}
          </Card>
        </div>
      </div>
    );
  }
}
