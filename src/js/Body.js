import React, { Component } from 'react';
import axios from 'axios';

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      currentCard: null,
      cards: [],
      cardData:[]
    }
    this.handleSelectCardClick = this.handleSelectCardClick.bind(this);
    this.handleSelectConfirmCard = this.handleSelectConfirmCard.bind(this);
    this.handlePublishClick = this.handlePublishClick.bind(this);
  }

  componentDidMount() {
    let instance = axios.create({
      baseURL: window.baseURL
    });
    let configs = {
      headers: {
        'Access-Token': window.accessToken,
        'Content-Type': 'application/json'
      }
    }
    // instance.defaults.headers['Access-Token'] = window.accessToken;
    // instance.defaults.headers['Content-Type'] = 'application/json';
    instance.get(`${window.baseURL}/accounts/${window.accountSlug}/template_cards/`, configs, {
      timeout: 5000
    }).then(response => {
      console.log(response, "response")
      this.setState({
        cards: response.data.template_cards
      })
    })
  }

  handleSelectCardClick(e) {
    const card = e.target.closest('.single-element');
    let instance = axios.create({
      baseURL: window.baseURL
    });
    let configs = {
      headers: {
        'Access-Token': window.accessToken,
        'Content-Type': 'application/json'
      }
    }
    // instance.defaults.headers['Access-Token'] = window.accessToken;
    // instance.defaults.headers['Content-Type'] = 'application/json';
    instance.get(`${window.baseURL}/accounts/${window.accountSlug}/template_cards/${card.id}`, configs, {
      timeout: 5000
    }).then(response => {
      console.log(response, "response of card data")
      const cardData = response.data.template_card;
      let newStateVars = {
        currentCard: cardData,
        accountID: cardData.account_id,
        APIName: cardData.git_repo_name,
        templateDatumID: cardData.template_datum_id,
        templateCardID: cardData.id
      };
      this.setState(newStateVars);
      this.handleSelectConfirmCard(newStateVars.currentCard);
    })
  }

  handleSelectConfirmCard(card) {
    let js_script = document.createElement('script'),
      loaded;
    this.setState({
      currentStep: 2
    });
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
  }

  handlePublishClick() {
    let postInstance = axios.create({
      baseURL: window.baseURL
    });
    let postData = this.state.protoGraphInstance.getData();
    // let configs = {
    //   headers: {
    //     'Access-Token': window.accessToken,
    //     'Content-Type': 'application/json'
    //   }
    // }
    postInstance.defaults.headers['Access-Token'] = window.accessToken;
    postInstance.defaults.headers['Content-Type'] = 'application/json';
    return postInstance.post(`${window.baseURL}/accounts/${window.accountSlug}/folders/${window.folderSlug}/datacasts`, {
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
    }
  }

  renderCard(card){
    var x = this.getProtoInstance(card.git_repo_name);
    let options = {
      selector: document.querySelector('#protograph_edit_form_holder'),
      data_url: card.files.schema_files.sample + "?no-cache=true",
      schema_url: card.files.schema_files.schema + "?no-cache=true",
      configuration_url: card.files.configuration_sample + "?no-cache=true",
      configuration_schema_url: card.files.configuration_schema + "?no-cache=true"
    };
    if (card.files.ui_schema) {
      options.ui_schema_url = card.files.ui_schema + "?no-cache=true"
    }
    if (card.files.base_url) {
      options.base_url = card.files.base_url
    }
    x.init(options);
    this.setState({
      protoGraphInstance : x
    });
    x.renderEdit(this.handlePublishClick);
  }

  renderCardSelector() {
    let cards = this.state.cards.map((card, i) => {
      return (
        <div  key={i} className="single-element" id={card.slug} onClick={this.handleSelectCardClick}>
          <div className="card-type-icon" data-tooltip={`${card.account_slug} / ${card.name}`} data-position="bottom center">
            <img src={card.icon_url} />
          </div>
        </div>
      )
    });
    return (
      <div className="ui main container">
        <h4> Select a card type </h4>
        <div className="protograph-toCardForm-cardsIconContainer">
          {cards.length >= 0 && cards}
        </div>
      </div>
    );
  }

  renderCardWYSIWYG() {
    return (
        <div id="protograph_edit_form_holder">Loading</div>
    )
  }

  render() {
    switch(this.state.currentStep) {
      case 1:
        return this.renderCardSelector();
      case 2:
        return this.renderCardWYSIWYG();
    }
  }
}

export default Body;
