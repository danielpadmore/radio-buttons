// index.js
// Top level index to render Toggle Buttons demo

import React from 'react' // Import React
import ReactDOM from 'react-dom' // Import React DOM
import './styles.scss' // Import styles from scss file
import ToggleButtons from './components/togglebuttons/ToggleButtons' // import ToggleButtons React Component

// Define example Q&A
const exampleQuestion = "Which of these is a number?"
const exampleAnswers = [
    {
        "value": "5",
        "correct": true
    },
    {
        "value": "No",
        "correct": false
    },
    {
        "value": "Maybe",
        "correct": false
    },
    {
        "value": "12",
        "correct": true
    },
    {
        "value": "462",
        "correct": true
    },
    {
        "value": "Joel",
        "correct": false
    }
  ]

const root = document.querySelector('#app') // Select app DOM element
ReactDOM.render(
    <ToggleButtons
        question = {exampleQuestion}
        answers = {exampleAnswers}
    />, root) // Render the Toggle Buttons Component with example Q&A