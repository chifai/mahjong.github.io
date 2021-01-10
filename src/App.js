import React from 'react';
import './App.css';
import NumButton from './components/NumButton';
import * as LayoutDef from './components/const';
import MissingMjCal from './components/MissingMjCal';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mjInHand: [],
    }
    this.objMissingMjCal = new MissingMjCal();

    this.NumConst = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    this.NumInHand = Array(16).fill(0);

    for (let index = 0; index < 16; index++) {
      this.state.mjInHand.push(this.renderMj(index, false))
    }
  }

  clickToAdd(i) {
    if (this.objMissingMjCal.changeMjNum(i, true) === true) {
      //this.setState({mjInHand: this.renderMjInHand()})
    }
    this.forceUpdate();
  }

  clickToDelete(i) {
    if (this.objMissingMjCal.changeMjNum(i, false) === true) {
      //this.setState({mjInHand: this.renderMjInHand()})
    }
    this.forceUpdate();
  }

  renderMjInHand() {
    /*
    const mjList = []
      console.log("len")
      console.log(this.objMissingMjCal.MjInHand.length)
      this.objMissingMjCal.MjInHand.forEach(el => {
        console.log("yo")
        mjList.push(this.renderButton(el, false));
      });
      return mjList
      */
     this.forceUpdate();
     return;
  }

  renderMj(index, bAdd) {
    if (bAdd === true) {
      return <NumButton value={index} onClick={() => this.clickToAdd(index)} />;
    }
    else {
      return <NumButton value={index} onClick={() => this.clickToDelete(index)} />;
    }
  }

  mjGetState(i) {
    return {
      value: i,
    };
  }

  render() {
    // create mahjong buttons with 1-9
    console.log("render")
    const btn_mj9 = []
    const btn_myMj = []
    for (let index = 0; index < 9; index++) {
      btn_mj9.push(this.renderMj(index + 1, true))
    }

    
    console.log(this.objMissingMjCal.MjInHand)
    const btn_copy = this.state.mjInHand.slice();
    this.objMissingMjCal.MjInHand.forEach(el => {
      btn_myMj.push(btn_copy[el]);
    });

    console.log(btn_copy)

    return (
      <div className="App">
        <header className="App-header">
          {/* print header */}
          {LayoutDef.web_logo}
          {LayoutDef.intro}
        </header>

        <body className="App-body">
          {/* print buttons */}
          <div>{btn_mj9}</div>
          <h3>你的手牌</h3>
          <div>{btn_myMj}</div>
          <h4>End</h4>
        </body>

        <footer className="App-footer">
          {/* print footer link */}
          {LayoutDef.intro_link}
        </footer>

      </div>
    )
  }
}

export default App;
