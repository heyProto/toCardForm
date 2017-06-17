import React, { Component } from 'react';
import SelectCard from './SelectCard';
import cardData from './../json/select_cards.json'

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Select a Card',
      cards: cardData.cards
    }

    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      console.log(nextProps);
    }
  }

  handleSearchChange(e) {
    const query = e.target.value;
    if (query === "") {
      this.setState({
        cards: cardData.cards
      });
      return;
    }
    const regex = new RegExp("^" + query, "gi");
    this.setState({
      cards: this.state.cards.filter((card) => regex.test(card.name))
    });
  }

  renderActive() {
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