import React, { Component } from 'react';

class SelectCard extends Component {
  render() {
    return (
      <div className="single-element" onClick={this.props.onSelectCardClick}>
        <div className="card-type-icon">
          <img src={this.props.card.icon_url} />
        </div>
        <div className="card-account-name">{this.props.card.account_slug}</div>
        <div className="card-type-name">{this.props.card.name}</div>
      </div>
    );
  }
}

export default SelectCard;