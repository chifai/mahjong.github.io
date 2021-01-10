import React from 'react';

class NumButton extends React.Component {
    render() {
        return (
            <button className="button" onClick={() => this.props.onClick()}>
            {this.props.value}
            </button>
        )
    }
  }

  export default NumButton