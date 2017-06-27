import React, { Component } from 'react';
import SideBar from '../js/SideBar';
import Steps from '../js/Steps';
import ViewForm from '../js/ViewForm';
import ConfirmCard from '../js/ConfirmCard';
import Publish from '../js/Publish';
import axios from 'axios';

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      currentCard: null,
      showConfirmCard: false,
      showSteps: true,
      showSideBar: true,
      showViewForm: true,
      showPublish: false
    }
    this.handleSelectCardClick = this.handleSelectCardClick.bind(this);
    this.handleSelectConfirmCard = this.handleSelectConfirmCard.bind(this);
    this.handlePublishClick = this.handlePublishClick.bind(this);
  }

  handleSelectCardClick(card, event) {
    console.log("handleSelectCardClick");
    let instance = axios.create({
      baseURL: window.baseURL
    });
    instance.defaults.headers['Access-Token'] = window.accessToken;
    instance.defaults.headers['Content-Type'] = 'application/json';
    instance.get(`${window.baseURL}/accounts/${card.account_slug}/template_cards/${card.id}`, {
      timeout: 5000
    }).then(response => {
      console.log(response, "response of card data")
      this.setState({
        showConfirmCard: true,
        showViewForm: false,
        showPublish: false,
        currentCard: response.data.template_card,
        accountID: card.account_id,
        APIName: card.name,
        templateDatumID: card.template_datum_id,
        templateCardID: card.id,
        currentStep: 1
      })
    })
  }

  handleSelectConfirmCard(card) {
    let js_script = document.createElement('script');
    document.body.appendChild(js_script);
    js_script.setAttribute('onload', this.renderCard(card));
    js_script.setAttribute('src', card.files.js);
    var css_script = document.createElement('link');
    css_script.rel = 'stylesheet';
    css_script.href = card.files.css;
    document.head.appendChild(css_script);
    this.setState({
      showViewForm: false,
      currentStep: 2,
      showPublish: true
    })
  }

  handlePublishClick(formData, event) {
    let postInstance = axios.create({
      baseURL: window.baseURL
    });
    postInstance.defaults.headers['Access-Token'] = window.accessToken;
    postInstance.defaults.headers['Content-Type'] = 'application/json';
    postInstance.post(`${window.baseURL}/accounts/${card.account_slug}/datacasts`, {
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
      console.log(response, "post response")
      window.location.href = response.data.redirect_path;
    })
    this.setState({
      showPublish: true
    });
  }

  renderCard(card){
    setTimeout(()=>{
      var x = eval(`new ${card.name}()`);
      x.init({
        selector: document.querySelector('#view_area'),
        data_url: card.files.schema_files.sample,
        schema_url: card.files.schema_files.schema,
        configuration_url: card.files.configuration_sample,
        configuration_schema_url: card.files.configuration_schema
      });
      this.setState({
        protoGraphInstance : x
      });
      x.renderEdit();
    }, 5000);
  }

  render() {
    // console.log(this.state.currentStep, "-------")
    let styles = this.state.currentStep === 1 ? {width: 729} :{width: 925}
    return (
      <div className="card-creation-container">
        {this.state.showSideBar ? <SideBar step={this.state.currentStep} onSelectCardClick={this.handleSelectCardClick} /> : ''}
        <div className="steps-area" style={styles}>
          {this.state.showSteps ? <Steps stepNumber={this.state.currentStep}/> : ''}
          {this.state.showViewForm ? <ViewForm /> : ''}
          {this.state.showConfirmCard ?
            <ConfirmCard card = {this.state.currentCard} onSelectConfirmClick = {this.handleSelectConfirmCard}/>
            : ''}
          {this.state.showPublish ?
            <Publish card = {this.state.currentCard} onPublishClick = {this.handlePublishClick}/>
            : ''}
        </div>
      </div>
    )
  }
}

export default Body;