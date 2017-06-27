import React, { Component } from 'react';
import axios from 'axios';

class ConfirmCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCard: 1
    }
    this.handleSelectCardClick = this.handleSelectCardClick.bind(this);
  }

  handleSelectCardClick(event) {
    console.log("target", event.target);
    let selectedCard = event.target.getAttribute("data-index");
    this.setState({
      selectedCard: selectedCard
    });
  }

  render() {
    console.log("render");
    let selectedCard = this.state.selectedCard,
      mainImage = './src/img/preview-' + selectedCard + '.png',
      styles = {
        opacity: 1
      };
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
        <button type="button" className="default-button primary-button preview-button" onClick={this.props.onSelectConfirmClick.bind(this, this.props.card)}>Continue</button>
        <div className="clearfix"></div>
        <div className="preview-slideshow">
          <div className="preview-main">
            <img className="preview-img" src={mainImage} />
          </div>
          <div className="preview-minimap">
            <div className="preview-mini-div" onClick={this.handleSelectCardClick}>
              <img className="preview-mini-img" data-index="1" style={selectedCard == 1 ? styles : {}} src="https://s3.ap-south-1.amazonaws.com/protos.dev/Assets/preview-1.png" />
            </div>
            <div className="preview-mini-div" onClick={this.handleSelectCardClick}>
              <img className="preview-mini-img" data-index="2" style={selectedCard == 2 ? styles : {}} src="https://s3.ap-south-1.amazonaws.com/protos.dev/Assets/preview-2.png" />
            </div>
            <div className="preview-mini-div" onClick={this.handleSelectCardClick}>
              <img className="preview-mini-img" data-index="3" style={selectedCard == 3 ? styles : {}} src="https://s3.ap-south-1.amazonaws.com/protos.dev/Assets/preview-3.png" />
            </div>
            <div className="preview-mini-div" onClick={this.handleSelectCardClick}>
              <img className="preview-mini-img" data-index="4" style={selectedCard == 4 ? styles : {}} src="https://s3.ap-south-1.amazonaws.com/protos.dev/Assets/preview-4.png" />
            </div>
            <div className="preview-mini-div" onClick={this.handleSelectCardClick}>
              <img className="preview-mini-img" data-index="5" style={selectedCard == 5 ? styles : {}} src="https://s3.ap-south-1.amazonaws.com/protos.dev/Assets/preview-5.png" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ConfirmCard;

