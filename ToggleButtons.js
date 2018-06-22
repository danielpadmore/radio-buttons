// Toggle Buttons Component

import React, { Component } from 'react' // import React & Component
import data from '../../example-question.json' // example question data pulled from server
import PropTypes from 'prop-types' // import prop types

export default class ToggleButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderState: false,
      answer: 'incorrect'
    }
  }

  toggleSwitch = (e, id) => {
    this.setState(prevState => {
      return {
        sliderState: !prevState.sliderState
      }
    })
  }

  render() {
    return (
      <div className = "app">
        <Question question = {data.question} />
        <div className = "slidercontainer" >
          <Slider onClick = {this.toggleSwitch} switched = {this.state.sliderState} id = {0} key = 'slider1' ans1 = {data.answers.a[0]} ans2 = {data.answers.a[1]} />
          <Slider onClick = {this.toggleSwitch} switched = {this.state.sliderState} id = {1} key = 'slider2' ans1 = {data.answers.b[0]} ans2 = {data.answers.b[1]} />
          <Slider onClick = {this.toggleSwitch} switched = {this.state.sliderState} id = {2} key = 'slider3' ans1 = {data.answers.c[0]} ans2 = {data.answers.c[1]} />
        </div>
        <Result result = {this.state.answer} />
        <BugReport />
      </div>
    )
  }
}

class Question extends Component {
  render() {
    return (
      <div className = "question">
        {this.props.question}
      </div>
    )
  }
}

class Slider extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const joinedClass = ["slider", this.props.className, (this.props.switched ? ' ' : 'switched')].join(' ')
    return (
      <div className = {joinedClass} onClick = {(e) => this.props.onClick(e, this.props.id)} >
        <Button />
        <div className = "slidertextwrapper">
          <SliderText answer = {this.props.ans1} />
          <SliderText answer = {this.props.ans2} />
        </div>
      </div>
    )
  }
}
Slider.propTypes = {
  switched: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string
}
Slider.defaultProps = {
  className: ''
}

function Button() {
  return(
    <div className = "button">
    </div>
  )
}

function SliderText(props) {
  return(
    <div className = "slidertextbox">
      <div className = "slidertext">
      {props.answer}
      </div>
    </div>
  )
}

class Result extends Component {
  render() {
    return (
      <div className = "result">
      The answer is {this.props.result.toString()}
      </div>
    )
  }
}

function BugReport() {
  return(
    <div className = "bugreport">
      <a href = "">
      <img id = "reportsvg" src="https://app.senecalearning.com/static/media/spotABug.8c82a621.svg" height = "15px"  />
      {' Spot a bug?'}
      </a>
    </div>

  )
}