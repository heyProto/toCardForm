import React, { Component } from 'react';
import axios from 'axios';

class ConfirmCard extends Component {
  render() {
    return(
      <div id="view_area" className="selected-card-preview">
        <div className="card-create-col-6">
          <div className="preview-title">{this.props.card.name}</div>
          <p>Account ID: {this.props.card.account_id}</p>
          <p>Account Slug: {this.props.card.account_slug}</p>
          <p>Global Slug: {this.props.card.global_slug}</p>
          <p>Elevator Pitch: {this.props.card.elevator_pitch}</p>
          <p>Icon URL: {this.props.card.files.icon_url}</p>
          <p>ID: {this.props.card.id}</p>
          <p>Slug: {this.props.card.slug}</p>
          <p>Template Datum Id: {this.props.card.template_datum_id}</p>
          <button type="button" className="default-button primary-button" onClick={this.props.onSelectConfirmClick.bind(this, this.props.card)}>Next -></button>
        </div>
      </div>
    )
  }
}

export default ConfirmCard;

