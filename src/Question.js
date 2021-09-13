import React from "react";
import {useState} from "react";


 function Question(props) {

    const {question} = props;
    const [userAnswer, setUserAnswer] = useState('')

    const okButtonHandler = () => {
        props.getAnswer(question.serialNumber,userAnswer);
        setUserAnswer('')
    }


    return (

        <div key={question.serialNumber}>
            {question.serialNumber}{' '}
            {question.firstNumber} {' '}
            {question.sign}{' '}
            {question.secondNumber}{' '} = {' '}
            {question.userAnswer === undefined &&
            <>
                <input
                    type="number"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(Number(e.target.value))}/>
                <button onClick={okButtonHandler}>Ok</button>
            </>
            }
            {''}{question.userAnswer}{''}


            <button onClick={props.getQuestion} disabled={question.userAnswer === undefined}>next</button>
        </div>


    );
}
export default Question



