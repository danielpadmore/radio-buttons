// Question Component

import React, { Component } from 'react' // import React & Component

export default class Question extends Component {
  render() {
    return (
      <div className = "question">
        {this.props.question}
      </div>
    )
  }
}