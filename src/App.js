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
      possibleGroup: [],
    }
    this.objMissingMjCal = new MissingMjCal();
    for (let index = 0; index < 16; index++) {
      this.state.mjInHand.push(this.renderMj(index, false))
    }

    this.possibleGroup = [];
  }

  clickToAdd(i) {
    if (this.objMissingMjCal.changeMjNum(i, true) === true) {
      this.possibleGroup = this.objMissingMjCal.calMissingMahjong().slice();
      this.forceUpdate();
    }
    
  }

  clickToDelete(i) {
    if (this.objMissingMjCal.changeMjNum(i, false) === true) {
      this.possibleGroup = this.objMissingMjCal.calMissingMahjong().slice();
      this.forceUpdate();
    }
  }

  renderMj(index, bAdd) {
    if (bAdd === true) {
      return <NumButton value={index} onClick={() => this.clickToAdd(index)} />;
    }
    else {
      return <NumButton value={index} onClick={() => this.clickToDelete(index)} />;
    }
  }

  renderAnswer() {
    let rdAns = [];
    let num = this.possibleGroup.length;
    if(num === 0) {
      return; 
    }

    this.possibleGroup.forEach(el => {
      const mj_ans = [];
      let bRed = false;
      el.group.forEach(MjNum => {
        if (MjNum === el.num && bRed === false) {
          mj_ans.push(<button className="button_red">{MjNum}</button>);
          bRed = true;
        }
        else {
          mj_ans.push(<button className="button">{MjNum}</button>);
        }
      })
      rdAns.push(<div>{mj_ans}</div>);
      rdAns.push(<br></br>);
    });

    <button className="button"></button>

    return rdAns;
  }

  render() {
    // create mahjong buttons with 1-9
    const btn_mj9 = [];
    const btn_myMj = [];
    for (let index = 0; index < 9; index++) {
      btn_mj9.push(this.renderMj(index + 1, true))
    }

    this.objMissingMjCal.MjInHand.forEach(el => {
      btn_myMj.push(this.state.mjInHand[el]);
    });

    const mj_ans = this.renderAnswer();


    const rdAns = this.renderAnswer();
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
          <h3>你的聽牌組合</h3>
          {rdAns}
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
