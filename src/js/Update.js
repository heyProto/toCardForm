import React, { Component } from 'react';
import axios from 'axios';

class Update extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 2,
      showSteps: true,
      showUpdate: true,
      updatedInstance: null
    }
    // this.handleUpdateClick = this.handleUpdateClick.bind(this);
    this.handlePublishClick = this.handlePublishClick.bind(this);
  }

  componentDidMount() {
    var card = window.viewCast.template_card;
    let js_script = document.createElement('script'),
      loaded;
    document.body.appendChild(js_script);
    js_script.onreadystatechange = js_script.onload = () => {
      if(!loaded) {
        this.renderUpdateCard(card);
        var imageBankButton = document.getElementById('protograph_image_bank_button');
        if(imageBankButton) {
          imageBankButton.style.display = 'block';
        }
      }
      loaded = true;
    };

    js_script.setAttribute('src', card.files.edit_file_js);
    var css_script = document.createElement('link');
    css_script.rel = 'stylesheet';
    css_script.href = card.files.css;
    document.head.appendChild(css_script);
  }

  getProtoInstance(instanceString) {
    switch (instanceString) {
      case 'ProtoGraph.Card.toSocial':
        return new ProtoGraph.Card.toSocial();
        break;
      case 'ProtoGraph.Card.toExplain':
        return new ProtoGraph.Card.toExplain();
        break;
      case 'ProtoGraph.Card.toQuiz':
        return new ProtoGraph.Card.toQuiz();
        break;
      case 'ProtoGraph.Card.toReportViolence':
        return new ProtoGraph.Card.toReportViolence();
        break;
      case 'ProtoGraph.Card.toLink':
        return new ProtoGraph.Card.toLink();
        break;
      case 'ProtoGraph.Card.toTimeline':
        return new ProtoGraph.Card.toTimeline();
        break;
      case 'ProtoGraph.Card.toAudioPhoto':
        return new ProtoGraph.Card.toAudioPhoto();
        break;
      case 'ProtoGraph.Card.toReportJournalistKilling':
        return new ProtoGraph.Card.toReportJournalistKilling();
        break;
      case 'ProtoGraph.Card.toDistrictProfile':
        return new ProtoGraph.Card.toDistrictProfile();
        break;
      case 'ProtoGraph.Card.toRainfall':
        return new ProtoGraph.Card.toRainfall();
        break;
      case 'ProtoGraph.Card.toWaterExploitation':
        return new ProtoGraph.Card.toWaterExploitation();
        break;
      case 'ProtoGraph.Card.toLandUse':
        return new ProtoGraph.Card.toLandUse();
        break;
      case 'ProtoGraph.Card.toWell':
        return new ProtoGraph.Card.toWell();
        break;
      case 'ProtoGraph.Card.toPoliticalLeadership':
        return new ProtoGraph.Card.toPoliticalLeadership();
        break;
      case 'ProtoGraph.Card.toMoveToANewCity':
        return new ProtoGraph.Card.toMoveToANewCity();
        break;
      case 'ProtoGraph.Card.toCluster':
        return new ProtoGraph.Card.toCluster();
        break;
      case 'ProtoGraph.Card.toQuestion':
        return new ProtoGraph.Card.toQuestion();
        break;
      case 'ProtoGraph.Card.toCompanyProfile':
        return new ProtoGraph.Card.toCompanyProfile();
        break;
      case 'ProtoGraph.Card.toStory':
        return new ProtoGraph.Card.toStory();
        break;
      case 'ProtoGraph.Card.toMedia':
        return new ProtoGraph.Card.toMedia();
        break;
    }
  }

  renderUpdateCard(card) {
    let update_x = this.getProtoInstance(card.git_repo_name);
    let options = {
      selector: document.querySelector('#view_area'),
      data_url: window.viewCast.remote_urls.data_url + "?no-cache=" + (new Date()).toJSON(),
      schema_url: window.viewCast.remote_urls.schema_json + "?no-cache=true",
      configuration_url: window.viewCast.remote_urls.configuration_url + "?no-cache=" + (new Date()).toJSON(),
      configuration_schema_url: window.viewCast.template_card.files.configuration_schema + "?no-cache=true"
    }
    if (window.viewCast.template_card.files.ui_schema) {
      options.ui_schema_url = window.viewCast.template_card.files.ui_schema + "?no-cache=true"
    }
    if (window.viewCast.template_card.files.base_url) {
      options.base_url = window.viewCast.template_card.files.base_url
    }
    if (window.houseColors) {
      options.houseColors = window.houseColors
    }
    update_x.init(options);
    this.setState({
      updatedInstance : update_x
    });
    update_x.renderEdit(this.handlePublishClick);
  }


  // handleUpdateClick() {
  //   let putInstance =  axios.create({
  //     baseURL: window.baseURL
  //   });
  //   putInstance.defaults.headers['Access-Token'] = window.accessToken;
  //   putInstance.defaults.headers['Content-Type'] = 'application/json';
  //   putInstance.put(`${window.baseURL}/accounts/${window.accountSlug}/datacasts/${window.viewCast.id}`, {
  //     "datacast": this.state.updatedInstance.getData().dataJSON,
  //     "view_cast": {
  //       "account_id": this.state.accountID,
  //       "template_datum_id": this.state.templateDatumID,
  //       "name": this.state.APIName,
  //       "template_card_id": this.state.templateCardID,
  //       "seo_blockquote": (typeof(this.state.updatedInstance.renderSEO) == "function") ? this.state.updatedInstance.renderSEO() : "",
  //       "optionalConfigJSON": JSON.stringify(this.state.updatedInstance.getData().optionalConfigJSON)
  //     }
  //   }).then(response => {
  //     console.log(response, "put response");
  //     window.location.href = response.data.redirect_path;
  //   })
  // }

  handlePublishClick() {
    let postInstance = axios.create({
      baseURL: window.baseURL
    });
    let postData = this.state.updatedInstance.getData();
    postInstance.defaults.headers['Access-Token'] = window.accessToken;
    postInstance.defaults.headers['Content-Type'] = 'application/json';
    return postInstance.put(`${window.baseURL}/accounts/${window.accountSlug}/folders/${window.folderSlug}/datacasts/${window.viewCast.id}`, {
      "datacast": postData.dataJSON,
      "view_cast": {
        "account_id": this.state.accountID,
        "template_datum_id": this.state.templateDatumID,
        "name": postData.name,
        "template_card_id": this.state.templateCardID,
        "seo_blockquote": (typeof(this.state.updatedInstance.renderSEO) == "function") ? this.state.updatedInstance.renderSEO() : "",
        "optionalConfigJSON": JSON.stringify(postData.optionalConfigJSON)
      }
    }).then(response => {
      console.log(response, "put response")
      window.location.href = response.data.redirect_path;
    }).catch(reject => {
      if(typeof(_errs) !== 'undefined'){
        _errs.push(reject);
      }
      const errorMessages = reject.response.data.error_message;
      if (errorMessages) {
        showAllValidationErrors(errorMessages);
      } else {
        generate_notify({text: reject.response.statusText, notify: "error"});
      }
    });
  }

  render() {
    return (
      <div className="ui grid">
        <div className="steps-area sixteen wide column">
          <div id="view_area" className="selected-card-preview"></div>
        </div>
      </div>
    )
  }
}

export default Update;
