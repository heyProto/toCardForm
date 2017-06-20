import React, { Component } from 'react';
import Steps from './Steps';
import Body from './Body';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: [
        {
          icon: 'none',
          title: 'SELECT',
          description: 'A card',
          completed: false,
          active: true
        },
        {
          icon: 'none',
          title: 'BUILD',
          description: 'The card',
          completed: false,
        }
      ]
    };

    this.handleStepChange = this.handleStepChange.bind(this);
  }

  handleStepChange(steps) {
    this.setState({steps});
  }

  render() {
    return (
      <div className="modal">
        <Steps steps={this.state.steps} completed={this.state.completed} />
        <Body steps={this.state.steps}
          onStepChange={this.handleStepChange}
        />
      </div>
    )
  }
}

export default Modal;
