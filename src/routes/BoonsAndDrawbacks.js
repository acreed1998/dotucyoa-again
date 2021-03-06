import React, { Component } from "react";
import NoChoiceCard from '../components/NoChoiceCard';
import ChoiceCard from '../components/ChoiceCard';
import _ from 'lodash';
import GridItem from '@material-ui/core/Grid';
// import UpgradeCard from "../components/UpgradeCard";
// import { array } from "prop-types";
// import MultiChoiceCard from '../components/MultiChoiceCard';

export default class BoonsAndDrawbacks extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.modifyBoons = this.modifyBoons.bind(this);
    this.modifyDrawbacks = this.modifyDrawbacks.bind(this);
  }

  modifyBoons(boonObject) {
    const user = this.props.user;
    const boons = user.boons;
    if (!_.includes(boons, boonObject)) {
      boons.push(boonObject);
      this.props.modifyBoons(boons);
    } else {
      _.pullAt(boons, _.indexOf(boons, boonObject));
      this.props.modifyBoons(boons);
    }
  }

  modifyDrawbacks(drawbackObject) {
    const user = this.props.user;
    const drawbacks = user.drawbacks;
    if (!_.includes(drawbacks, drawbackObject)) {
      drawbacks.push(drawbackObject);
      this.props.modifyDrawbacks(drawbacks);
    } else {
      _.pullAt(drawbacks, _.indexOf(drawbacks, drawbackObject));
      this.props.modifyDrawbacks(drawbacks);
    }
  }

  render() {
    return (
      <div>
        <NoChoiceCard cardText={this.props.boons.opening} />
        <GridItem container spacing={24} justify='space-evenly'>
          {_.map(this.props.boons.choices, (choice, index) => {
            return (
              <GridItem key={`bandd-grid-${index}`} item xs>
                <ChoiceCard
                  cardText={choice.text}
                  special={index}
                  picked={_.includes(this.props.user.boons, choice)}
                  onClick={() => { this.modifyBoons(choice) }} />
              </GridItem>
            );
          })}
        </GridItem>
        <NoChoiceCard cardText={this.props.drawbacks.opening} />
        <GridItem container spacing={24} justify='space-evenly'>
          {_.map(this.props.drawbacks.choices, (choice, index) => {
            return (
              <GridItem key={`bandd-grid-${index}`} item xs>
                <ChoiceCard
                  cardText={choice.text}
                  special={index}
                  picked={_.includes(this.props.user.drawbacks, choice)}
                  onClick={() => { this.modifyDrawbacks(choice) }} />
              </GridItem>
            );
          })}
        </GridItem>
      </div>
    );
  }
}

