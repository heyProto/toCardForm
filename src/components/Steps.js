import React, { Component } from 'react';

class Steps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: this.props.completed
    }
  }

  render() {
    const stepItems = this.props.steps.map((step, i) => {
      let className = "step";
      className += (step.completed) ? " completed" : "";
      className += (step.active) ? " active" : "";
      return (
        <div className={className} key={i}>
          <div className="content">
            <div className="title">{step.title}</div>
            <div className="description">{step.description}</div>
          </div>
        </div>
      )
    });
    return (
      <div id="steps">
        <div className="ui ordered steps">
          {stepItems}
        </div>
      </div>
    )
  }
}

export default Steps;