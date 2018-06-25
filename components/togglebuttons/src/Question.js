// Question Component

import React, { Component } from 'react' // import React & Component
import PropTypes from 'prop-types' // import PropTypes

export default class Question extends Component { // Export Question Component by default

  // Render function
  render() {

    // return question div containing question
    return (
      <div className = "question">
        {this.props.question}
      </div>
    )
  }
}
Question.propTypes = {
  question: PropTypes.string.isRequired
}