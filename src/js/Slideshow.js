import React, { Component } from 'react';
import axios from 'axios';

class Slideshow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCard: 1
    }
    this.handleSelectCardClick = this.handleSelectCardClick.bind(this);
  }

  handleSelectCardClick(event) {
    let selectedCard = event.target.getAttribute("data-index");
    this.setState({
      selectedCard: selectedCard
    });
  }

  render() {
    let selectedCard = this.state.selectedCard,
      mainImage = 'https://s3.ap-south-1.amazonaws.com/protos.dev/Assets/preview-' + selectedCard + '.png',
      styles = {
        opacity: 1
      };
    return(
      <div className="preview-slideshow">
        <div className="preview-main">
          <img className="preview-img" src={mainImage} />
        </div>
        <div className="preview-minimap">
          <div className="preview-mini-div">
            <img className="preview-mini-img" onClick={this.handleSelectCardClick} data-index="1" style={selectedCard == 1 ? styles : {}} src="https://s3.ap-south-1.amazonaws.com/protos.dev/Assets/preview-1.png" />
          </div>
          <div className="preview-mini-div">
            <img className="preview-mini-img" onClick={this.handleSelectCardClick} data-index="2" style={selectedCard == 2 ? styles : {}} src="https://s3.ap-south-1.amazonaws.com/protos.dev/Assets/preview-2.png" />
          </div>
          <div className="preview-mini-div">
            <img className="preview-mini-img" onClick={this.handleSelectCardClick} data-index="3" style={selectedCard == 3 ? styles : {}} src="https://s3.ap-south-1.amazonaws.com/protos.dev/Assets/preview-3.png" />
          </div>
          <div className="preview-mini-div">
            <img className="preview-mini-img" onClick={this.handleSelectCardClick} data-index="4" style={selectedCard == 4 ? styles : {}} src="https://s3.ap-south-1.amazonaws.com/protos.dev/Assets/preview-4.png" />
          </div>
          <div className="preview-mini-div">
            <img className="preview-mini-img" onClick={this.handleSelectCardClick} data-index="5" style={selectedCard == 5 ? styles : {}} src="https://s3.ap-south-1.amazonaws.com/protos.dev/Assets/preview-5.png" />
          </div>
        </div>
      </div>
    )
  }
}

export default Slideshow;

