import React, { Component } from "react";
import NoChoiceCard from '../components/NoChoiceCard';
import ChoiceCard from '../components/ChoiceCard';
import _ from 'lodash';
import GridItem from '@material-ui/core/Grid';
import { GiConsoleController } from "react-icons/gi";
import MultiChoiceCard from '../components/MultiChoiceCard';

export default class RaceAndAbilities extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.changeRace = this.changeRace.bind(this);
    this.chooseAbility = this.chooseAbility.bind(this);
  }

  changeRace(userRace) {
    // const twoSpecials = _.includes(_.map(this.props.user.boons, boon => boon.name), 'The Chosen One');
    const twoRaces = _.includes(_.map(this.props.user.boons, boon => boon.name), 'Born This Way');
    const races = this.props.user.race;
    console.log(twoRaces, userRace);
    if (_.includes(races, userRace)) {
      this.props.changeRace(_.filter(races, Race => Race !== userRace));
    } else {
      if (twoRaces === true && races.length < 2) {
        races.push(userRace);
        this.props.changeRace(races);
      } else if (twoRaces === false && races.length < 1) {
        races.push(userRace);
        this.props.changeRace(races);
      } else if (twoRaces === false && races.length === 1) {
        races[0] = userRace;
        this.props.changeRace(races);
      }
    }
  }

  chooseAbility(abilityObject) {
    console.log(abilityObject);
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
            if (choice['multi-pick']) {
              return (
                <GridItem key={`special-grid-${index}`} item xs>
                  <MultiChoiceCard
                    cardText={choice.text}
                    special={index}
                    chooseAbility={this.props.chooseAbility}
                    picked={_.includes(this.props.user.abilities, index)}
                    ammountPicked={_.filter(this.props.user.abilities, ability => ability.ability === choice.ability).length}
                    onPlus={() => { this.chooseAbility(choice) }}
                    onMinus={() => { this.chooseAbility(choice) }} />
                </GridItem>
              );

            } else {
              return (
                <GridItem key={`special-grid-${index}`} item xs>
                  <ChoiceCard
                    cardText={choice.text}
                    special={index}
                    chooseAbility={this.props.chooseAbility}
                    picked={_.includes(this.props.user.abilities, index)}
                    onClick={() => { this.chooseAbility(choice) }} />
                </GridItem>
              );
            }
          })}
        </GridItem>
      </div>
    );
  }
}

