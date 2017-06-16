import React, { Component } from 'react';
import Select from './Select';

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render() {
    return (
      <div id="content_body">
        <Select />
      </div>
    )
  }
}

export default Body;