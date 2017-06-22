import React, { Component } from 'react';
import Select from './Select';
import SelectMore from './SelectMore';
import FillForm from './FillForm';
import ViewForm from './ViewForm';
import Publish from './Publish';
// import constants from './Constants.js';
import axios from 'axios';

// console.log(Select, "------Select-----")

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
      formMarginClass: "margin_right_80",
      protoGraphInstance: null
    }

    this.handleSelectCardClick = this.handleSelectCardClick.bind(this);
    this.handleSelectMoreConfirm = this.handleSelectMoreConfirm.bind(this);
    this.handlePublishClick = this.handlePublishClick.bind(this);
    this.handleUpdateClick = this.handleUpdateClick.bind(this);
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
        currentCard: response.data.template_card,
        accountID: card.account_id,
        APIName: card.name,
        templateDatumID: card.template_datum_id,
        templateCardID: card.id
      })
    })
  }
  renderCard = (card) => {
    // console.log(card, "-------renderCard")
    var self = this;
    setTimeout(()=>{
      var x = eval(`new ${card.name}()`);
      console.log(x, "xxxxxxxxxx")
      x.init({
        selector: document.querySelector('#fill_form'),
        data_url: card.files.schema_files.sample,
        schema_url: card.files.schema_files.schema,
        configuration_url: card.files.configuration_sample, 
        configuration_schema_url: card.files.configuration_schema
      });
      this.setState({
        protoGraphInstance : x
      });
      x.renderEdit();
    }, 2000);
  }

  handleSelectMoreConfirm(card, formSchemaUrl, event) {
    // console.log("======confirm=========", card, formSchemaUrl, event)
    var js_script = document.createElement('script');
    document.body.appendChild(js_script);
    js_script.setAttribute('onload', this.renderCard(card));
    js_script.setAttribute('src', card.files.js);
    var css_script = document.createElement('link');
    css_script.rel = 'stylesheet';
    css_script.href = card.files.css;
    document.head.appendChild(css_script);
    
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
    var postInstance = axios.create({
      baseURL: window.baseURL
    });
    postInstance.defaults.headers['Access-Token'] = window.accessToken;
    postInstance.defaults.headers['Content-Type'] = 'application/json';
    // debugger;
    postInstance.post(`${window.baseURL}/accounts/icfj/datacasts`, {
      "datacast": this.state.protoGraphInstance.getData().dataJSON,
      "view_cast": {
        "account_id": this.state.accountID, 
        "template_datum_id": this.state.templateDatumID,
        "name": this.state.APIName, 
        "template_card_id": this.state.templateCardID, 
        "seo_blockquote": this.state.protoGraphInstance.renderSEO(),
        "optionalConfigJSON": JSON.stringify(this.state.protoGraphInstance.getData().optionalConfigJSON)
      }
    }).then(response => {
      document.getElementById("fill_form").innerHTML = "";
      this.renderUpdateCard();
      console.log(response, "post response")
      // window.location.href = response.data.redirect_path;
    })
    this.setState({
      showPublish: true,
      formData
      // bodyMarginClass: "margin_shift_left_40"
    });
  }

  renderUpdateCard = () => {
    setTimeout(()=>{
      var update_x = eval(`new ${window.viewCast.template_card.name}()`);
      console.log(update_x, "updated xxxxxxxxxx instance")
      update_x.init({
        selector: document.querySelector('#fill_form'),
        data_url: window.viewCast.remote_urls.data_url,
        schema_url: window.viewCast.remote_urls.schema_json,
        configuration_url: window.viewCast.remote_urls.configuration_url, 
        configuration_schema_url: window.viewCast.template_card.files.configuration_schema
      });
      update_x.renderEdit();
      this.setState({
        updatedInstance : update_x
      })
    }, 2000);
  }


  handleUpdateClick() {
    console.log("update click", this.state, this.state.templateCardID, this.state.updatedInstance)
    // this.renderUpdateCard();
    var putInstance =  axios.create({
      baseURL: window.baseURL
    });
    putInstance.defaults.headers['Access-Token'] = window.accessToken;
    putInstance.defaults.headers['Content-Type'] = 'application/json';
    putInstance.put(`${window.baseURL}/accounts/icfj/datacasts/${window.viewCast.id}`, {
      "datacast": this.state.updatedInstance.getData().dataJSON,
      "view_cast": {
        "account_id": this.state.accountID, 
        "template_datum_id": this.state.templateDatumID,
        "name": this.state.APIName, 
        "template_card_id": this.state.templateCardID, 
        "seo_blockquote": this.state.updatedInstance.renderSEO(),
        "optionalConfigJSON": JSON.stringify(this.state.updatedInstance.getData().optionalConfigJSON)
      }
    }).then(response => {
      console.log(response, "put response")
    })
  }

  render() {
    return (
      <div id="content_body" className={this.state.bodyMarginClass ? this.state.bodyMarginClass: ""}>
        <Select active={this.state.currentStep === 0 ? true : false}
          onSelectCardClick={this.handleSelectCardClick}/>
        {this.state.showSelectMore ?
          <SelectMore card={this.state.currentCard}
            onSelectMoreConfirm={this.handleSelectMoreConfirm} cardData = {this.state.check}/>
          : ''}

        <div id="form" className={this.state.formMarginClass}>
          {this.state.showFillForm ?
            <FillForm />
            : ''}

          {this.state.showViewForm ?
            <ViewForm onPublishClick={this.handlePublishClick} onUpdateClick={this.handleUpdateClick}/>
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
