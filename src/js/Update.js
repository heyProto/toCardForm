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
      }
      loaded = true;
    };

    js_script.setAttribute('src', card.files.edit_file_js);
    var css_script = document.createElement('link');
    css_script.rel = 'stylesheet';
    css_script.href = card.files.css;
    document.head.appendChild(css_script);
  }

  renderUpdateCard(card) {
    let update_x = eval(`new ${card.git_repo_name}()`);
    let options = {
      selector: document.querySelector('#view_area'),
      data_url: window.viewCast.remote_urls.data_url,
      schema_url: window.viewCast.remote_urls.schema_json,
      configuration_url: window.viewCast.remote_urls.configuration_url,
      configuration_schema_url: window.viewCast.template_card.files.configuration_schema
    }
    if (window.viewCast.template_card.files.ui_schema) {
      options.ui_schema_url = window.viewCast.template_card.files.ui_schema
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
    return postInstance.put(`${window.baseURL}/accounts/${window.accountSlug}/datacasts/${window.viewCast.id}`, {
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
      _errs.push(reject);
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
      <div className="card-update-container ui grid">
        <div className="steps-area sixteen wide column">
          <div id="view_area" className="selected-card-preview"></div>
        </div>
      </div>
    )
  }
}

export default Update;
