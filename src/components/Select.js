import React, { Component } from 'react';
import SelectCard from './SelectCard';
// import cardData from './../json/select_cards.json'
import axios from 'axios';
import constants from './Constants.js';

// console.log(cardData, "cardData")
// const access_token = '8fd5708dbb755cfc4ca199d1ba68ddd46fab4331d509d72f';
// const base_url = 'http://192.168.0.103:3000/api/v1'

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Select a Card',
      cards: []
    }

    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  componentDidMount() {
    // console.log(base_url, "base_url", access_token)
    var instance = axios.create({
      baseURL: constants.baseURL
    });
    instance.defaults.headers['Access-Token'] = constants.accessToken;
    instance.defaults.headers['Content-Type'] = 'application/json';
    instance.get(`${constants.baseURL}/accounts/icfj/template_cards/`, {
      timeout: 5000
    }).then(response => {
      console.log(response, "response", this)
      this.setState({
        cards: response.data.template_cards
      })
    })

  }

  componentWillReceiveProps(nextProps) {
    // console.log("componentWillReceiveProps")
    if (this.props !== nextProps) {
      console.log(nextProps);
    }
  }

  handleSearchChange(e) {
    // const query = e.target.value;
    // if (query === "") {
    //   this.setState({
    //     cards: cardData.cards
    //   });
    //   return;
    // }
    // const regex = new RegExp("^" + query, "gi");
    // this.setState({
    //   cards: this.state.cards.filter((card) => regex.test(card.name))
    // });
  }

  renderActive() {
    console.log(this.state.cards, "-----")
    return (
      <div id="select">
        <form className="ui form" id="search_box">
          <div className="field">
            <input type="text" name="query" placeholder="Search..."
              onChange={this.handleSearchChange} />
          </div>
        </form>
        <div id="select_cards">
          <div className="ui cards">
            {this.state.cards.map(
              (card, i) => <SelectCard card={card} key={i} onSelectCardClick={this.props.onSelectCardClick.bind(this, card)} />
            )}
          </div>
        </div>
      </div>
    )
  }

  renderInactive() {
    return (
      <div id="select">
        <button className="ui left labeled icon teal button" id="select_back">
          <i className="left arrow icon"></i>Change Selection
        </button>
        <div id="select_cards">
          <div className="ui cards">
            {this.state.cards.map(
              (card, i) => <SelectCard card={card} key={i} onSelectCardClick={this.props.onSelectCardClick.bind(this, card)} />
            )}
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (this.props.active ? this.renderActive() : this.renderInactive())
  }
}

export default Select;