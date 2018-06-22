// index.js
// Top level index to render Toggle Buttons demo

import React from 'react' // Import React
import ReactDOM from 'react-dom' // Import React DOM
import './styles.scss' // Import styles from scss file
import ToggleButtons from './components/togglebuttons/ToggleButtons' // import ToggleButtons React Component

const root = document.querySelector('#app') // Grab app DOM element
ReactDOM.render(<ToggleButtons />, root) // Render the Toggle Buttons Component