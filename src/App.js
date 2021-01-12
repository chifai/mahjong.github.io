import React from 'react';
import './App.css';
import * as LayoutDef from './components/const';
import MissingMjCal from './components/MissingMjCal';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.objMissingMjCal = new MissingMjCal();
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

  renderMjButton(index, bAdd) {
    if (bAdd === true) {
      return <button
        className="button"
        onClick={() => this.clickToAdd(index)}>
        {index}
      </button>;
    }
    else {
      return <button
        className="button"
        onClick={() => this.clickToDelete(index)}>
        {index}
      </button>;
    }
  }

  renderAnswer() {
    let rdAns = [];
    let num = this.possibleGroup.length;
    if (num === 0) {
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

    return rdAns;
  }

  render() {
    const btn_mj9 = [];
    const btn_myMj = [];
    const rdAns = this.renderAnswer();

    // create mahjong buttons, click to add
    for (let index = 0; index < 9; index++) {
      btn_mj9.push(this.renderMjButton(index + 1, true))
    }
    
    // create mahjong in hand, click to delete
    this.objMissingMjCal.MjInHand.forEach(el => {
      btn_myMj.push(this.renderMjButton(el, false));
    });

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
