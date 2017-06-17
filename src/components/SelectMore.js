import React, { Component } from 'react';
import axios from 'axios';

class SelectMore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {
        header: "Header",
        formSchemaUrl: "json/form1.json"
      }
    }
    this.getJsonData(props.card.next_url);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.getJsonData(nextProps.card.next_url);
    }
  }

  getJsonData(url) {
    axios.get(url)
      .then((response) => {
        this.setState({
          details: response.data
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div id="select_more">
        <h1 className="ui header">{this.state.details.header}</h1>
        <div>{this.props.card.description}</div>
        <br />
        <button className="ui green button"
          onClick={this.props.onSelectMoreConfirm.bind(this, this.props.card, this.state.details.formSchemaUrl)}>
          Confirm
        </button>
      </div>
    )
  }
}

export default SelectMore;