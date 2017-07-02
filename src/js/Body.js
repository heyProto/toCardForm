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
    var rem = document.getElementsByClassName('single-element active');
    var inactive = "single-element";
    var active = "single-element active";
    var i = 0;
    while (i < rem.length) {
      i++;
      rem[0].className = inactive;
    }
    var add = document.getElementById(card.name);
    add.className = active;
    let instance = axios.create({
      baseURL: window.baseURL
    });
    instance.defaults.headers['Access-Token'] = window.accessToken;
    instance.defaults.headers['Content-Type'] = 'application/json';
    instance.get(`${window.baseURL}/accounts/${window.accountSlug}/template_cards/${card.id}`, {
      timeout: 5000
    }).then(response => {
      console.log(response, "response of card data")
      this.setState({
        showConfirmCard: true,
        showViewForm: false,
        showPublish: false,
        currentCard: response.data.template_card,
        accountID: card.account_id,
        APIName: card.git_repo_name,
        templateDatumID: card.template_datum_id,
        templateCardID: card.id,
        currentStep: 1
      })
    })
  }

  handleSelectConfirmCard(card) {
    let js_script = document.createElement('script'),
      loaded;
    document.body.appendChild(js_script);
    js_script.onreadystatechange = js_script.onload = () => {
      if(!loaded) {
        this.renderCard(card);
      }
      loaded = true;
    };
    js_script.setAttribute('src', card.files.edit_file_js);
    var css_script = document.createElement('link');
    css_script.rel = 'stylesheet';
    css_script.href = card.files.css;
    document.head.appendChild(css_script);
    this.setState({
      showViewForm: false,
      currentStep: 2,
      showPublish: true
    });
  }

  handlePublishClick(formData, event) {
    let postInstance = axios.create({
      baseURL: window.baseURL
    });
    let postData = this.state.protoGraphInstance.getData();
    postInstance.defaults.headers['Access-Token'] = window.accessToken;
    postInstance.defaults.headers['Content-Type'] = 'application/json';
    postInstance.post(`${window.baseURL}/accounts/${window.accountSlug}/datacasts`, {
      "datacast": postData.dataJSON,
      "view_cast": {
        "account_id": this.state.accountID,
        "template_datum_id": this.state.templateDatumID,
        "name": postData.name,
        "template_card_id": this.state.templateCardID,
        "seo_blockquote": (typeof(this.state.protoGraphInstance.renderSEO) == "function") ? this.state.protoGraphInstance.renderSEO() : "",
        "optionalConfigJSON": JSON.stringify(postData.optionalConfigJSON)
      }
    }).then(response => {
      console.log(response, "post response")
      window.location.href = response.data.redirect_path;
    })
    this.setState({
      showPublish: true
    });
  }

  getProtoInstance(instanceString) {
    switch (instanceString) {
      case 'ProtoGraph.Card.toShare':
        return new ProtoGraph.Card.toShare();
        break;
      case 'ProtoGraph.Card.toExplain':
        return new ProtoGraph.Card.toExplain();
        break;
      // case 'ProtoGraph.Card.toQuiz':
      //   return new ProtoGraph.Card.toQuiz();
      //   break;
    }
  }

  renderCard(card){
    var x = this.getProtoInstance(card.git_repo_name);
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
    x.renderEdit({
      onLastStep: function() {
        document.querySelector(".steps-area .publish-button").style.display = "block";
      },
      notOnLastStep: function() {
        document.querySelector(".steps-area .publish-button").style.display = "none";
      }
    });
    document.querySelector(".section-title").style.display = "block";
  }

  render() {
    // console.log(this.state.currentStep, "-------")
    return (
      <div className="card-creation-container ui grid">
        {this.state.showSideBar ? <SideBar step={this.state.currentStep} onSelectCardClick={this.handleSelectCardClick} /> : ''}
        <div className="steps-area thirteen wide column">
          {this.state.showSteps ? <Steps stepNumber={this.state.currentStep}/> : ''}
          <div className="section-title">
            <div className="card-create-col-6 section-title-text">Fill the form</div>
            <div className="card-create-col-6 section-title-text">This is how it will look</div>
          </div>
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
