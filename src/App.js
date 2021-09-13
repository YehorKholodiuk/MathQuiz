import React from 'react'
import './App.css';
import {useState} from "react"
import {useEffect} from "react"
import Question from "./Question"
function App() {
  const signs = ['+','-','*']
  const quizLength = 5;
  const [questions,setQuestions] = useState([])
  const [serialNumber,setSerialNumber] = useState(1)
  const [score,setScore]= useState(undefined)
  const [countOfQuiz,setCountOfQuiz]= useState(0)

  const getQuestion = () => {
    const firstNumber = Math.floor(Math.random() * 10);
    const sign = signs[Math.floor(Math.random() * 3)];
    const secondNumber = Math.floor(Math.random() * 10);


    const newQuestions = [...questions,
      {
        serialNumber,
        firstNumber,
        sign,
        secondNumber
      }]

    setQuestions(newQuestions);
  if (questions.length === 0) setScore(undefined)

  }
    const getRightAnswer = (question) => {
      switch (question.sign) {
        case '+':
          return question.firstNumber + question.secondNumber;

        case '-':
          return question.firstNumber - question.secondNumber;

        case '*':
          return question.firstNumber * question.secondNumber;

        default:
          return 'error';
      }
    }

    const getAnswer = (serialNumber, userAnswer) => {
      const rightAnswer = getRightAnswer(questions[questions.length - 1])
      const newQuestions = questions.map(el => {
        if (el.serialNumber === serialNumber) return {...el, rightAnswer, userAnswer}
        return el;
      })
      setQuestions(newQuestions);
      setSerialNumber(serialNumber + 1)

    }


    const getResult = () => {
      const newScore = questions.map(el => {
        if (el.rightAnswer === el.userAnswer) return 1;
        return 0;
      }).reduce((acc, curr) => acc + curr, 0);
      setScore(newScore)
      setSerialNumber(1)
      setQuestions([])
      setCountOfQuiz(countOfQuiz + 1)
    }

    useEffect(() => {
      if (quizLength === questions.length) {
        getResult();
      }
    }, [serialNumber])


    useEffect(() => {
      setQuestions([])

    }, [countOfQuiz])


    return (
        <div className="App">
          <h1>Math quiz</h1>
          <button onClick={getQuestion} disabled={serialNumber !== 1}>start</button>
          {score === undefined &&
          questions.filter((el, i) => i === questions.length - 1).map(el =>
              <Question
                  key={el.serialNumber}
                  question={el}
                  getAnswer={getAnswer}
                  getQuestion={getQuestion}
              />
          )}

          <br/>
          {score !== undefined && <p>Your score is {score} out of {quizLength}</p>}
        </div>
    );
  }


export default App;














