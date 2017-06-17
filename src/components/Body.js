import React, { Component } from 'react';
import Select from './Select';
import SelectMore from './SelectMore';
import FillForm from './FillForm';
import ViewForm from './ViewForm';
import Publish from './Publish';

class Body extends Component {
  constructor(props) {
    super(props);
    const currentStep = this.props.steps.findIndex((step) => step.active === true);
    this.state = {
      currentStep,
      currentCard: null,
      showSelectMore: false,
      showFillForm: false,
      showViewForm: false,
      showPublish: false,
      formSchema: "json/form1.json",
      formMarginClass: "margin_right_80"
    }

    this.handleSelectCardClick = this.handleSelectCardClick.bind(this);
    this.handleSelectMoreConfirm = this.handleSelectMoreConfirm.bind(this);
    this.handlePublishClick = this.handlePublishClick.bind(this);
  }

  handleSelectCardClick(card, event) {
    // Add Select More View
    this.setState({
      showSelectMore: true,
      currentCard: card
    })
  }

  handleSelectMoreConfirm(card, formSchemaUrl, event) {
    let steps = this.props.steps;
    steps[0].active = false;
    steps[0].completed = true;
    steps[1].active = true;
    this.props.onStepChange(steps);
    this.setState({
      showFillForm: true,
      showViewForm: true,
      formSchemaUrl,
      currentStep: 1,
      formMarginClass: "margin_left_80",
    })
  }

  handlePublishClick(formData, event) {
    this.setState({
      showPublish: true,
      formData,
      bodyMarginClass: "margin_shift_left_40"
    });
  }

  render() {
    return (
      <div id="content_body" className={this.state.bodyMarginClass ? this.state.bodyMarginClass: ""}>
        <Select active={this.state.currentStep === 0 ? true : false}
          onSelectCardClick={this.handleSelectCardClick}
        />
        {this.state.showSelectMore ?
          <SelectMore card={this.state.currentCard}
            onSelectMoreConfirm={this.handleSelectMoreConfirm}
          />
          : ''}

        <div id="form" className={this.state.formMarginClass}>
          {this.state.showFillForm ?
            <FillForm />
            : ''}

          {this.state.showViewForm ?
            <ViewForm onPublishClick={this.handlePublishClick} />
            : ''}
        </div>
        {this.state.showPublish ?
            <Publish formData={this.state.formData} />
            : ''}
      </div>
    )
  }
}

export default Body;