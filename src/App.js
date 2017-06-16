import React, { Component } from 'react';
import Modal from './components/Modal';
import './App.css';

class App extends Component {
  constructor () {
    super();
    this.state = {
      showModal: true
    };
    
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  
  handleOpenModal () {
    this.setState({ showModal: true });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }
  
  render () {
    return (
      <div>
        <button id="trigger" onClick={this.handleOpenModal}>Trigger Modal</button>
        {this.state.showModal?
          <Modal /> : null}
        {this.state.showModal?
          <button id="close-modal" onClick={this.handleCloseModal} >X</button> : null}
      </div>
    );
  }
}

export default App;
