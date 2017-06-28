import React, { Component } from 'react';

class Steps extends Component {
  render() {
    let activeStep1 = this.props.stepNumber === 1 ? 'active-step' : '',
      activeStep2 = this.props.stepNumber === 1 ? '' : 'active-step'
    return(
      <div className="steps-bar">
        <div className={`card-create-col-6 steps step-1 ${activeStep1}`}>
          <div className="step-no">1</div>
          <div className="step-name">Select</div>
        </div>
        <div className={`card-create-col-6 steps step-2 ${activeStep2}`}>
          <div className="step-no">2</div>
          <div className="step-name">Write</div>
        </div>
        <div className="clearfix"></div>
      </div>
    )
  }
}

export default Steps;



