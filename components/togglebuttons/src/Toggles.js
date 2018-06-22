// Toggles Component

import React, { Component } from 'react' // import React
import PropTypes from 'prop-types' // import prop types

export default class Toggles extends Component {
  render() {
    const joinedClass = ["toggle", this.props.className, (this.props.toggleState ? ' ' : 'switched')].join(' ')
    return (
      <div className = {joinedClass} onClick = {(e) => this.props.onToggle(e, this.props.id)} >
        <Button />
        <div className = "toggletextwrapper">
          <SliderText answer = {this.props.ans1} />
          <SliderText answer = {this.props.ans2} />
        </div>
      </div>
    )
  }
}
/*Toggles.propTypes = {
  switched: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string
}
Toggles.defaultProps = {
  className: ''
}*/

function Button() {
  return(
    <div className = "button">
    </div>
  )
}

function SliderText(props) {
  return(
    <div className = "toggletextbox">
      <div className = "toggletext">
        {props.answer}
      </div>
    </div>
  )
}