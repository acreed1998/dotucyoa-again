import React, { Component } from "react";
import NoChoiceCard from '../components/NoChoiceCard';
import ChoiceCard from '../components/ChoiceCard';
import _ from 'lodash';
import GridItem from '@material-ui/core/Grid';
// import MultiChoiceCard from '../components/MultiChoiceCard';

export default class Ship extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.chooseShip.bind(this);
    this.chooseShipStyle.bind(this);
  }

  chooseShip(shipObject) {
    const points = this.props.user.points;
    if (!_.isEqual(this.props.user.ship, shipObject)) {
      if (points - shipObject.points > -1) {
        this.props.changeShip(shipObject);
      }
    } else {
      this.props.changeShip({});
    }
  }

  chooseShipStyle(shipStyleObject) {
    const points = this.props.user.points;
    if (!_.isEqual(this.props.user.ship_style, shipStyleObject)) {
      if (points - shipStyleObject.points > -1) {
        this.props.changeShipStyle(shipStyleObject);
      }
    } else {
      this.props.changeShipStyle({});
    }
  }

  render() {
    return (
      <div>
        <NoChoiceCard cardText={this.props.ship.opening} />
        <GridItem container spacing={24} justify='space-evenly'>
          {_.map(this.props.ship.choices, (choice, index) => {
            return (
              <GridItem key={`ship-grid-${index}`} item xs>
                <ChoiceCard
                  cardText={choice.text}
                  special={index}
                  picked={_.isEqual(this.props.user.ship, choice)}
                  onClick={() => { this.chooseShip(choice) }} />
              </GridItem>
            );
          })}
        </GridItem>
        <NoChoiceCard cardText={this.props.ship_style.opening} />
        <GridItem container spacing={24} justify='space-evenly'>
          {_.map(this.props.ship_style.choices, (choice, index) => {
            return (
              <GridItem key={`ship_style-grid-${index}`} item xs>
                <ChoiceCard
                  cardText={choice.text}
                  special={index}
                  picked={_.isEqual(this.props.user.ship_style, choice)}
                  onClick={() => { this.chooseShipStyle(choice) }} />
              </GridItem>
            );
          })}
        </GridItem>
        <NoChoiceCard cardText={this.props.ship_traits.opening} />
        <GridItem container spacing={24} justify='space-evenly'>
          {_.map(this.props.ship_traits.choices, (choice, index) => {
            return (
              <GridItem key={`ship_traits-grid-${index}`} item xs>
                <ChoiceCard
                  cardText={choice.text}
                  special={index}
                  picked={_.includes(this.props.user.ship_traits, choice)}
                  onClick={() => { console.log('mine') }} />
              </GridItem>
            );
          })}
        </GridItem>
      </div>
    );
  }
}

