// Toggle Buttons Component
/* COMMENT EVERYTHING UP AND WRITE README.MD FIRST, THEN TRY ADD TESTS/POLISH OFF ANY FLAWS */
import React, { Component } from 'react' // import React & Component
import data from '../../example-question-3.json' // example question data pulled from server
import Question from './src/Question' // import question component
import Toggles from './src/Toggles' // import toggles component
import Result from './src/Result' // import result component

export default class ToggleButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frozen: false,
      answerString: 'incorrect',
      correctAnswers: Array(Object.keys(data.answers).length).fill(null),
      currentAnswers: Array(Object.keys(data.answers).length).fill(null), 
      correctIndex: []
    }
    this.handleToggle = this.handleToggle.bind(this)
    this.correctCheck = this.correctCheck.bind(this)
  }
  componentDidMount() {
    const correct = Array.from(data.answers).map(item => item.correct)
    const current = [false, true, false]//randomiseToggles()
    this.setState({
      correctAnswers: correct,
      currentAnswers: current
    })
  }
  randomiseToggles() {
    //const answers = this.state.currentAnswers.slice()
    return( [false, true, false] )
  }
  handleToggle(e, i) {
    //const answers = this.state.currentAnswers.slice()
    //answers[i] = newAnswer
    if(this.state.frozen === true){return}
    this.setState(prevState => {
      //console.log(prevState.currentAnswers[i])
      let newAnswers = this.state.currentAnswers.slice()
      const correctAnswers = this.state.correctAnswers.slice()
      newAnswers[i] = !prevState.currentAnswers[i]
      //console.log(this.correctCheck(newAnswers, correctAnswers))
      if(this.correctCheck(newAnswers, correctAnswers)[0]) {
        //this.questionComplete()
        return {
          currentAnswers: newAnswers,
          answerString: 'correct', 
          frozen: true
        }
      }
      else {
        return {currentAnswers: newAnswers}
      }
    })
  }
  /* TRY TO USE COUNT TO MAKE A COLOUR MODIFIER IF THERES TIME */
  correctCheck(newAnswers, correctAnswers) {
    //console.log(Object.keys(correctAnswers).length)
    const total = Object.keys(correctAnswers).length
    let count = 0
    for(let i = 0; i < total; i++) {
      if(correctAnswers[i] === newAnswers[i])
        {count = count + 1
          continue}
    }
    if(count === total) {
      return ([true, count])
    }
    else {return ([false, count])}
  }
  render() {
    //console.log(Object.keys(data.answers).length)
    let appClass = ["app", this.state.answerString, (this.state.answerString === 'correct' ? 'correct' : 'incorrect')].join(' ')
    return (
      <div className = {appClass}>
        <Question id = "question" question = {data.question} />
        <TogglesList 
          id = "toggleslist"
          toggleState = {this.state.currentAnswers}
          onToggle = {this.handleToggle}
          answers = {data.answers}
        />
        <Result id = "result" result = {this.state.answerString} />
      </div>
    )
  }
}

function TogglesList(props) {
  const answers = props.answers
  const list = answers.map((answer, i) =>
    <Toggles 
      key = {i}
      id = {i} 
      ans1 = {answer.text[0]} 
      ans2 = {answer.text[1]} 
      toggleState = {props.toggleState[i]}
      onToggle = {props.onToggle}
    />
  )
  return(
    <div className = "togglecontainer">
      {list}
    </div>
  )
}