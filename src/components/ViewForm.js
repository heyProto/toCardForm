import React, { Component } from 'react';

class ViewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        question: "What is this?",
        answer: "This is that."
      }
    }
  }

  render() {
    return (
      <div id="view_form">
        The form will be viewed here.<br/>
        {this.state.formData.question}
        {this.state.formData.answer}
        <br/>
        <button className="ui green button"
          onClick={this.props.onPublishClick.bind(this, this.state.formData)}>
          Publish
        </button>
      </div>
    )
  }
}

export default ViewForm;