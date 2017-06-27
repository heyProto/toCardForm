import React, { Component } from 'react';
import axios from 'axios';

class ConfirmCard extends Component {
  render() {
    return(
      <div id="view_area" className="selected-card-preview">
        <div className="preview-header">
          {this.props.card.is_public === false &&
            <i className="lock icon"></i>
          }
          <span className="preview-account-title">{this.props.card.account_slug} / </span>
          <span className="preview-title">{this.props.card.name}</span>
          {this.props.card.is_public === false &&
            <span className="preview-private-text">Private</span>
          }
          <img className="preview-icon" src={this.props.card.files.icon_url}/>
          <div className="clearfix"></div>
        </div>
        <div className="preview-elevator-pitch">
          {this.props.card.elevator_pitch}
        </div>
        <div className="preview-description">{this.props.card.description}</div>
        <button type="button" className="default-button primary-button preview-button" onClick={this.props.onSelectConfirmClick.bind(this, this.props.card)}>Next ></button>
      </div>
    )
  }
}

export default ConfirmCard;

