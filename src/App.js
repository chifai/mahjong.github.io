import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import Hello from './components/Hello'
import { render } from '@testing-library/react';

const intro = <h3> 選擇你的數牌 </h3>;
const web_logo = <img src={logo} className="App-logo" alt="logo" />;

const intro_link = <a
  className="App-link"
  href="https://github.com/chifai"
  target="_blank"
  rel="noopener noreferrer"
>
  click here
                  </a>;

class test extends React.Component {
  render() {
    return 0;
  }
}

class num_button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
    };
  }

  render() {
    return (
      <button
        className="square"
        onClick={() => this.setState({ value: 'X' })}
      >
        {this.state.value}
      </button>
    );
  }
}

function Square(props) {
  return (
    <button className="button" onClick={props.onClick}>
      {props.value}
    </button>
  )
}

class App extends Component {

  RenderButton(i) {
    return <num_button value={i} />;
  }

  render() {
    // create buttons of 1-9 array
    const Buttons = []
    for (let index = 1; index < 10; index++) {
      Buttons.push(this.RenderButton(index))
    }

    return (
      <div className="App">
        <header className="App-header">
          {/* web logo */}
          {web_logo}

          {/* print intro */}
          {intro}

          <Square value={1} />


        </header>

        <body className="App-body">
          {/* print buttons */}
          {Buttons}
          <num_button value={1} />
          
          {/* print link */}
          {intro_link}
        </body>
      </div>
    )
  }
}

export default App;
