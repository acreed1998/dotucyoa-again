import React, { Component } from "react";
import NoChoiceCard from '../components/NoChoiceCard';

export default class Opening extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <NoChoiceCard cardText={this.props.openingText} />
      </div>
    );
  }
}

