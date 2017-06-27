import React, { Component } from 'react';
import SelectCard from '../js/SelectCard';
import axios from 'axios';

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      currentStep: 1,
      cardData:[]
    }
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  componentDidMount() {
    let instance = axios.create({
      baseURL: window.baseURL
    });
    instance.defaults.headers['Access-Token'] = window.accessToken;
    instance.defaults.headers['Content-Type'] = 'application/json';
    instance.get(`${window.baseURL}/accounts/icfj/template_cards/`, {
      timeout: 5000
    }).then(response => {
      console.log(response, "response")
      this.setState({
        cards: response.data.template_cards,
        cardData:response.data.template_cards
      })
    })

  }

  handleSearchChange(e) {
    console.log(e.target.value);
    const query = e.target.value;
     if (query === "") {
       this.setState({
         cards: this.state.cardData
       });
       return;
     }
     this.setState({
       cards: this.state.cardData.filter((card) => {
        return card.name.includes(query);
       })
     });
  }

  render() {
    let styles = (this.props.step === 1 || this.props.step === undefined)? {width: 250} : {width: 54}
    return (
      <div className="card-create-sidebar" style={styles}>
        <div className="sidebar-card-search">
          <input type="text" className="sidebar-textbox" id="root_firstName" label="First name" required="" placeholder="Search cards" autoFocus onChange = {this.handleSearchChange}/>
        </div>
        <div>
          {
            this.state.cards.map((card, i) =>
              <SelectCard card={card} key={i} onSelectCardClick={this.props.onSelectCardClick.bind(this, card)} />)
          }
        </div>
      </div>
    )
  }
}

export default SideBar;
