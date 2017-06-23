import React, { Component } from 'react';

class Publish extends Component {
  render() {
    return (
      <div>
        <button type="button" className="default-button primary-button publish-button" onClick={this.props.onPublishClick.bind(this, this.props.card)}>Publish</button>
      </div>
    )
  }
}

export default Publish;