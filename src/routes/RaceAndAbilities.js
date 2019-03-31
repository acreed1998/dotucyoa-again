import React, { Component } from "react";
import NoChoiceCard from '../components/NoChoiceCard';
import ChoiceCard from '../components/ChoiceCard';
import _ from 'lodash';
import GridItem from '@material-ui/core/Grid';

export default class RaceAndAbilities extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }


  render() {
    return (
      <div>
        <NoChoiceCard cardText={this.props.races.opening} />
        <GridItem container spacing={24} justify='space-evenly'>
          {_.map(this.props.races.choices, (choice, index) => {
            return (
              <GridItem key={`special-grid-${index}`} item xs>
                <ChoiceCard
                  cardText={choice.text}
                  special={index}
                  changeRace={this.props.changeRace}
                  picked={_.includes(this.props.user.race, index)}
                  onClick={() => { this.changeRace(index) }} />
              </GridItem>
            );
          })}
        </GridItem>
        <NoChoiceCard cardText={this.props.abilities.opening} />
        <GridItem container spacing={24} justify='space-evenly'>
          {_.map(this.props.abilities.choices, (choice, index) => {
            return (
              <GridItem key={`special-grid-${index}`} item xs>
                <ChoiceCard
                  cardText={choice.text}
                  special={index}
                  chooseAbility={this.props.chooseAbility}
                  picked={_.includes(this.props.user.abilities, index)}
                  onClick={() => { this.chooseAbility(index) }} />
              </GridItem>
            );
          })}
        </GridItem>
      </div>
    );
  }
}

