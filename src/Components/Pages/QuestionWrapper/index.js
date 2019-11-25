import React  from 'react';
import Header from '../../Header';
import Question from '../../Question';
import Creator from '../../Creator';
import Join from '../../Join';
import ToTSubmit from '../../ToTSubmit';
import './QuestionWrapper.css';

export default function QuestionWrapper() {

    return(
        <div>
            <Header/>
            <div className="screen">
                <div className="partition1"><Creator/></div>
            </div>
        </div>
    )
}