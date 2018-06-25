// Toggle Buttons Component
import React, { Component } from 'react' // import React & Component
import PropTypes from 'prop-types' // import prop types
import Question from './src/Question' // import question component
import Toggles from './src/Toggles' // import toggles component
import Result from './src/Result' // import result component

export default class ToggleButtons extends Component { // Export default as ToggleButtons Component
  
  constructor(props) {
    super(props);
    this.state = {
      frozen: false,
      resultString: 'incorrect',
      toggleState: Array(Object.keys(this.props.answers).length).fill(null),
      colourState: []
    }
  }

  componentWillMount = () => {
    const randomToggles = this.randomiseToggles(Array.from(this.props.answers.slice(0,this.props.answers.length/2)))
    const correctAnswers = this.props.answers
        .map((answer, idx) => {return (idx % 2 === 1) ? null : answer.correct})
        .filter((answer) => answer != null)
    var correct = this.correctCheck(randomToggles, correctAnswers)
    var colours = this.updateColours(correct[1]/this.state.toggleState.length)
    this.setState({
      toggleState: randomToggles,
      colourState: colours
    })
  }

  componentWillUnmount = () => {
    this.setState({
      frozen: [],
      resultString: [],
      toggleState: [],
      colourState: []
    })
  }

  // Function to randomise starting toggle positions, all positions as incorrect would be too obvious
  randomiseToggles = (arrayToggles) => {
    return Array.from(arrayToggles, () => Math.random() >= 0.5)
  }
  
  // Function to create new colour themes
  updateColours = (index) => {
    var cMod = index * 80
    var red = [250, 247]
    var green = [145 + cMod, 59 + cMod]
    var blue = [97, 28]

    return [
      ['rgba(', red[0], ',' , green[0], ',', blue[0], ',', '0.7)'].join(''),
      ['rgba(', red[1], ',' , green[1], ',', blue[1], ',', '0.7)'].join('')
    ]
  }

  // Function to handle clicks on toggles
  handleToggle = (e, i) => {

    // Once correct answer is found, freeze toggles from use.
    if(this.state.frozen === true){return}

    //Update answer state with new toggle positions
    this.setState(prevState => {
      let newAnswers = this.state.toggleState.slice()
      const correctAnswers = this.props.answers
        .map((answer, idx) => {return (idx % 2 === 1) ? null : answer.correct})
        .filter((answer) => answer != null)
      newAnswers[i] = !prevState.toggleState[i]

      // Check if current answer is correct & update colour scheme
      var correct = this.correctCheck(newAnswers, correctAnswers)
      var newColours = this.updateColours(correct[1]/this.state.toggleState.length)
      if(correct[0]) {

        // On correct answer, freeze toggles, change result string and update state
        return {
          toggleState: newAnswers,
          resultString: 'correct',
          colourState: ['#29f0d5', '#23c9d4'],
          frozen: true
        }
      }

      // On incorrect answer, update state
      else {
        return {
          toggleState: newAnswers,
          colourState: newColours
        }
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

  render() {
    
    // var to dynamically change background colour using linear gradient
    var backgroundColour = ['linear-gradient(', this.state.colourState[0], ', ', this.state.colourState[1], ')'].join('')
    
    // Return Question, ToggleList and Result using example data and Component logic
    return (
      <div
        className = {"app"}
        style = {{background: backgroundColour}}>
        <Question id = "question" question = {this.props.question} />
        <TogglesList 
          id = "toggleslist"
          toggleState = {this.state.toggleState}
          onToggle = {this.handleToggle}
          answers = {this.props.answers}
          colourState = {this.state.colourState}
        />
        <Result id = "result" result = {this.state.resultString} />
      </div>
    )
  }
}

// Define ToggleButtons propTypes
ToggleButtons.propTypes = {
  question: PropTypes.string.isRequired,
  answers: PropTypes.array.isRequired
}
ToggleButtons.defaultProps = {
  question: "Question Missing",
  answers: [
    {
    "value": "Answers Missing",
    "correct": false
    },
    {
    "value": "Answers Missing",
    "correct": false
    }
  ]
}

// Stateless component to create variable number of Toggles
function TogglesList(props) {

  // Pair answers up for toggles
  const numToggles = props.answers.length/2
  var answers = Array(numToggles)
  for(var a = 0, b = 0; a < numToggles; a++, b += 2) {
    answers[a] = [props.answers[b].value, props.answers[b+1].value]
  }

  // Use map to create Toggles based on number of answers
  const list = answers.map((answer, i) =>
      <Toggles 
      key = {i}
      id = {i} 
      ans = {answer}
      toggleState = {props.toggleState[i]}
      onToggle = {props.onToggle}
      colourState = {props.colourState[1]}
    />
  )
  return(
    <div className = "togglecontainer">
      {list}
    </div>
  )
}