# radio-buttons
> Button styled component to display a question, an interactive series of toggled answers and a result statement.

The component is intended as a recreation demo of existing component at Seneca Learning.

## Installing / Getting Started

To use this component, fork/download the repo, install dependencies and run the webpack development server as below.

```shell
npm install --save-dev
npm run dev
```

## Features

* Dynamically adapts to new questions and answers
* Adapts to varying number of answers
* Animated toggles
* Component colour change on correct answer

## Functionality

For this demo, the component imports a json file with a question and a varying number of answer objects. The answer objects contain two answer options per question and boolean to indicate the correct answer. In production, the json demo file role would be handled by a server.

### Initial configuration

To change the question/answers displayed, create and import json files in this format:
```example
{
  "question": "[INSERT YOUR QUESTION HERE]",
  "answers": [
    {
      "text": ["ANSWER1", "ANSWER2"],
      "correct": [TRUE=ANSWER1 FALSE=ANSWER2]
    }
  ]
}
```

## Links

Visit http://seneca.io for more information on Seneca Learning

## License

[License detail to go here]