// Result Component

import React, { Component } from 'react' // import React & Component

export default class Result extends Component {
  render() {
    return (
      <div className = "result">
      The answer is {this.props.result.toString()}
      </div>
    )
  }
}