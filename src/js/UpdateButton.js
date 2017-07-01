import React, { Component } from 'react';

class UpdateButton extends Component {

  render() {
    return (
      <button type="button" className="default-button primary-button update-button"
        onClick={this.props.onUpdateClick.bind(this)}>
        Update
      </button>
    )
  }
}

export default UpdateButton;