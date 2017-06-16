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

  render() {
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
            {this.state.cards.map((card, i) => <SelectCard card={card} key={i} />)}
          </div>
        </div>
      </div>
    )
  }
}

export default Select;