import React, { Component } from 'react';
import Select from './Select';
import SelectMore from './SelectMore';
import FillForm from './FillForm';
import ViewForm from './ViewForm';
import Publish from './Publish';
// import constants from './Constants.js';
import axios from 'axios';

console.log(Select, "------Select-----")

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
      cardId: 1,
      formSchema: "json/form1.json",
      formMarginClass: "margin_right_80"
    }

    this.handleSelectCardClick = this.handleSelectCardClick.bind(this);
    this.handleSelectMoreConfirm = this.handleSelectMoreConfirm.bind(this);
    this.handlePublishClick = this.handlePublishClick.bind(this);
  }

  handleSelectCardClick(card, event) {
    // Add Select More View
    console.log(card, "----card------")
    var instance = axios.create({
      baseURL: window.baseURL
    });
    instance.defaults.headers['Access-Token'] = window.accessToken;
    instance.defaults.headers['Content-Type'] = 'application/json';
    instance.get(`${window.baseURL}/accounts/icfj/template_cards/${card.id}`, {
      timeout: 5000
    }).then(response => {
      console.log(response, "response of card data")
      this.setState({
        showSelectMore: true,
        currentCard: response.data.template_card
      })
    })
  }

  renderCard(card) {
    console.log(card, "-------renderCard")
    setTimeout(function(){
      var x = eval(`new ${card.name}()`) ;
      console.log(x, "xxxxxxxxxx")
      x.init({
        selector: document.querySelector('#fill_form'),
        data_url: card.files.schema_files.sample,
        schema_url: card.files.schema_files.schema,
        configuration_url: card.files.configuration_sample, 
        configuration_schema_url: card.files.configuration_schema
      })
      x.renderEdit();
      x.getData();
    }, 2000)
  }

  handleSelectMoreConfirm(card, formSchemaUrl, event) {
    console.log("======confirm=========", card, formSchemaUrl, event)
    var js_script = document.createElement('script');
    document.body.appendChild(js_script);
    js_script.setAttribute('onload', this.renderCard(card));
    js_script.setAttribute('src', card.files.js);

    var css_script = document.createElement('link');
    css_script.rel = 'stylesheet';
    css_script.href = card.files.css;
    document.head.appendChild(css_script);

    // var x = new card['name']();
    // x.init({
    //   selector: document.querySelector('#explainer-div'),
    //   data_url: 'https://s3.ap-south-1.amazonaws.com/protos.dev/Schemas/toExplain/0.0.1/sample.json',
    //   schema_url: 'https://s3.ap-south-1.amazonaws.com/protos.dev/Schemas/toExplain/0.0.1/schema.json',
    //   configuration_url: 'dist/0.0.1/configuration_sample.json', 
    //   configuration_schema_url: 'dist/0.0.1/configuration_schema.json'
    // })
    // x.renderEdit();
    
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
          onSelectCardClick={this.handleSelectCardClick}/>
        {this.state.showSelectMore ?
          <SelectMore card={this.state.currentCard}
            onSelectMoreConfirm={this.handleSelectMoreConfirm}/>
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