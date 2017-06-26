import React, { Component } from 'react';
import axios from 'axios';

class ConfirmCard extends Component {
  render() {
    return(
      <div id="view_area" className="selected-card-preview">
        <div className="card-create-col-6">
          <div className="preview-title">Quiz</div>
          <p>A quiz is a simple and fun story telling format that journalists can use to educate readers on critical information. A well-framed quiz can drive engagement because it challenges the readers knowledge on a topic. Beginners can create a quiz using nothing more than a Google spreadsheet. The experience of the quiz is similar to that Flash cards.</p>
          <button type="button" className="default-button primary-button" onClick={this.props.onSelectConfirmClick.bind(this, this.props.card)}>Confirm</button>
        </div>
      </div>
    )
  }
}

export default ConfirmCard;