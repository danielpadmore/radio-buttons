// Toggles Component

import React, { Component } from 'react' // import React
import PropTypes from 'prop-types' // import prop types

export default class Toggles extends Component { // Export Toggles Component by default
  
  render() {

    // Using a dynamic string className to handle toggle style
    const joinedClass = [
      "toggle",
      this.props.className,
      (this.props.toggleState ? ' ' : 'switched')
    ].join(' ')

    // Return the Toggle button and two SliderText Components with answers
    return (
      <div 
        className = {joinedClass}
        onClick = {(e) => this.props.onToggle(e, this.props.id)}
      >
        <Button colourState = {this.props.colourState} />
        <div className = "toggletextwrapper">
          <SliderText answer = {this.props.ans[0]} />
          <SliderText answer = {this.props.ans[1]} />
        </div>
      </div>
    )
  }
}

// Define Toggle propTypes
Toggles.propTypes = {
  onToggle: PropTypes.func.isRequired,
  className: PropTypes.string,
  colourState: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  ans: PropTypes.array.isRequired,
  toggleState: PropTypes.bool.isRequired
}
Toggles.defaultProps = {
  className: ''
}

// Stateless function to return button div
function Button(props) {
  let joinedClass = "button"
  return(
    <div
    className = {joinedClass}
    style = {{borderColor: props.colourState, backgroundColor: props.colourState}}>
    </div>
  )
}

// Stateless function to return SliderText divs
function SliderText(props) {
  return(
    <div className = "toggletextbox">
      <div className = "toggletext">
        {props.answer}
      </div>
    </div>
  )
}