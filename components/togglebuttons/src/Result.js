// Result Component

import React, { Component } from 'react' // import React & Component

export default class Result extends Component { // Export Result Component by default

  // Render function
  render() {

    // Return string declaring the answer as correct or incorrect
    return (
      <div className = "result">
      The answer is {this.props.result.toString()}
      </div>
    )
  }
}