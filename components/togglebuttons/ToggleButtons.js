// Toggle Buttons Component
import React, { Component } from 'react' // import React & Component
import data from './example-questions/example-question-3.json' // example question data pulled from server
import Question from './src/Question' // import question component
import Toggles from './src/Toggles' // import toggles component
import Result from './src/Result' // import result component

export default class ToggleButtons extends Component { // Export default as ToggleButtons Component
  
  // Constructor to set up initial state
  constructor(props) {
    super(props);
    this.state = {
      frozen: false,
      resultString: 'incorrect',
      correctAnswers: Array(Object.keys(data.answers).length).fill(null),
      currentAnswers: Array(Object.keys(data.answers).length).fill(null),
      colourState: ''
    }
  }

  // Lifecycle: on component mount set values to the states
  componentWillMount = () => {
    const correct = Array.from(data.answers).map(item => item.correct)
    const current = this.randomiseToggles(Array(Object.keys(data.answers).length))
    this.setState({
      correctAnswers: correct,
      currentAnswers: current
    })
  }

  // Lifecycle: on component unmount, clear state
  componentWillUnmount = () => {
    this.setState({
      frozen: [],
      resultString: [],
      correctAnswers: [],
      currentAnswers: [],
      colourState: []
    })
  }

  // Function to randomise starting toggle positions (all positions as incorrect would be too obvious?)
  randomiseToggles = (numToggles) => {
    return(Array.from(
      numToggles,
      () => Math.random() >= 0.5
    ))
  }

  // Function to handle clicks on toggles
  handleToggle = (e, i) => {

    // Once correct answer is found, freeze toggles from use.
    if(this.state.frozen === true){return}

    //Update answer state with new toggle positions
    this.setState(prevState => {
      let newAnswers = this.state.currentAnswers.slice()
      const correctAnswers = this.state.correctAnswers.slice()
      newAnswers[i] = !prevState.currentAnswers[i]

      // Check if current answer is correct
      if(this.correctCheck(newAnswers, correctAnswers)[0]) {

        // On correct answer, freeze toggles, change result string and update state
        return {
          currentAnswers: newAnswers,
          resultString: 'correct',
          colourState: 'correct',
          frozen: true
        }
      }

      // On incorrect answer, update state
      else {
        return {currentAnswers: newAnswers}
      }
    })
  }

  // Function to handle checking answers, called from handleToggle
  correctCheck = (newAnswers, correctAnswers) => {
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

  // Render component
  render() {

    // Using a dynamic string className to handle app colour
    let appClass = [
      "app",
      this.state.colourState,
      (this.state.colourState === 'correct' ? 'correct' : 'incorrect')
    ].join(' ')
    
    // Return Question, ToggleList and Result using data from json and Component logic
    return (
      <div className = {appClass}>
        <Question id = "question" question = {data.question} />
        <TogglesList 
          id = "toggleslist"
          toggleState = {this.state.currentAnswers}
          onToggle = {this.handleToggle}
          answers = {data.answers}
          colourState = {this.state.colourState}
        />
        <Result id = "result" result = {this.state.resultString} />
      </div>
    )
  }
}

// Stateless component to create variable number of Toggles
function TogglesList(props) {

  // Use map to create Toggles based on number of answers
  const list = props.answers.map((answer, i) =>
    <Toggles 
      key = {i}
      id = {i} 
      ans1 = {answer.text[0]} 
      ans2 = {answer.text[1]} 
      toggleState = {props.toggleState[i]}
      onToggle = {props.onToggle}
      colourState = {props.colourState}
    />
  )

  // return container div and list
  return(
    <div className = "togglecontainer">
      {list}
    </div>
  )
}