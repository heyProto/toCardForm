import React, { Component } from 'react';

class SelectCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card" onClick={this.props.onSelectCardClick}>
        <div className="content">
          <img className="left floated mini ui image" src={this.props.card.icon_url} />
          <div className="header">
            {this.props.card.name}
          </div>
          <div className="meta">
            {this.props.card.elevator_pitch}
          </div>
          <div className="description">
            {this.props.card.description}
          </div>
        </div>
      </div>
    );
  }
}

export default SelectCard;