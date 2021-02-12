import React from 'react';
import './App.css';
import * as LayoutDef from './components/const';
import MissingMjCal from './components/MissingMjCal';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.objMissingMjCal = new MissingMjCal();
    this.ans = [];
  }

  clickToAdd(i) {
    if (this.objMissingMjCal.changeMjNum(i, true) === true) {
      let temp = this.objMissingMjCal.calMissingMahjong();
      this.ans = temp.slice();
      this.forceUpdate();
    }
  }

  clickToDelete(i) {
    if (this.objMissingMjCal.changeMjNum(i, false) === true) {
      let temp = this.objMissingMjCal.calMissingMahjong();
      this.ans = temp.slice();
      this.forceUpdate();
    }
  }

  renderMjButton(index, bAdd) {
    if (bAdd === true) {
      if (index === 0) {
        return <button
          className="button"
          onClick={() => this.clickToAdd(index)}>
          {'發'}
        </button>;
      }
      return <button
        className="button"
        onClick={() => this.clickToAdd(index)}>
        {index}
      </button>;
    }
    else {
      if (index === 0) {
        return <button
          className="button"
          onClick={() => this.clickToDelete(index)}>
          {'發'}
        </button>;
      }
      return <button
        className="button"
        onClick={() => this.clickToDelete(index)}>
        {index}
      </button>;
    }
  }

  renderEachGroup(MjGroup, rdAns) {
    MjGroup.forEach(el => {
      const mj_ans = [];
      let bRed = false;
      el.group.forEach(mjGroup => {
        mjGroup.forEach(MjNum => {
          if (MjNum === el.num && bRed === false) {
            if (MjNum === 0)
              mj_ans.push(<button className="button_red">{'發'}</button>);
            else
              mj_ans.push(<button className="button_red">{MjNum}</button>);
            bRed = true;
          }
          else {
            if (MjNum === 0)
              mj_ans.push(<button className="button">{'發'}</button>);
            else
              mj_ans.push(<button className="button">{MjNum}</button>);
          }
        })
        mj_ans.push(<rect className="rect">{' '}</rect>);
      })
      rdAns.push(<div>{mj_ans}</div>);
      rdAns.push(<br></br>);
    });

    return rdAns;
  }

  renderAnswer() {
    // render each {numToDitch: 0, MjGroup: []}
    let rdAns = []

    this.ans.forEach(el => {
      if (el.numToDitch === 0) {
        rdAns.push(<h3>已糊牌</h3>);
      }
      else if (el.numToDitch === -1) {
        if (el.MjGroup.length === 0) {
          rdAns.push(<h3>無法聽牌</h3>);
        }
        else {
          rdAns.push(<h3>你的聽牌組合</h3>);
          this.renderEachGroup(el.MjGroup, rdAns);
        }
      }
      else {
        rdAns.push(<h3>打掉{el.numToDitch}號牌，聽以下組合</h3>);
        this.renderEachGroup(el.MjGroup, rdAns);
      }

    })
    return rdAns;
  }

  render() {
    const btn_mj9 = [];
    const btn_myMj = [];
    const rdAns = this.renderAnswer();

    // create mahjong buttons, click to add
    btn_mj9.push(this.renderMjButton(0, true));
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
