import React  from 'react';
import Header from '../../Header';
import Question from '../../Question';
import './QuestionWrapper.css';

export default function QuestionWrapper() {

    return(
        <div>
            <Header/>
            <div className="screen">
                <div className="partition1"><Question/></div>
            </div>
        </div>
    )
}