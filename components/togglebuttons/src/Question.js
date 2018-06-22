// Question Component

import React, { Component } from 'react' // import React & Component

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