import React, { Component } from "react";
import NoChoiceCard from '../components/NoChoiceCard';
import ChoiceCard from '../components/ChoiceCard';
import _ from 'lodash';
import GridItem from '@material-ui/core/Grid';
// import MultiChoiceCard from '../components/MultiChoiceCard';

export default class ArmorAndWeapons extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.chooseWeapon = this.chooseWeapon.bind(this);
  }

  chooseArmor(armorObject) {
    const armor = this.props.user.armor.sort();
    const armorNames = ['Space Suit', armorObject.type];
    let points = this.props.user.points;
    if (!_.includes(armor, armorObject)) {
      if (points - armorObject.points > -1) {
        if (armorObject.type !== 'Space Suit') {
          _.remove(armor, armor => !_.includes(armorNames, armor.type));
        }
        armor.push(armorObject);
        this.props.modifyArmor(armor);
      }
    } else {
      _.pullAt(armor, _.indexOf(armor, armorObject));
      this.props.modifyArmor(armor);
    }
  }

  chooseWeapon(weaponObject) {
    const weapons = this.props.user.weapons;
    let points = this.props.user.points;
    if (!_.includes(weapons, weaponObject)) {
      if (points - weaponObject.points > -1) {
        weapons.push(weaponObject);
        this.props.modifyWeapons(weapons);
      }
    } else {
      _.pullAt(weapons, _.indexOf(weapons, weaponObject));
      this.props.modifyWeapons(weapons);
    }
  }

  render() {
    return (
      <div>
        <NoChoiceCard cardText={this.props.armor.opening} />
        <GridItem container spacing={24} justify='space-evenly'>
          {_.map(this.props.armor.choices, (choice, index) => {
            return (
              <GridItem key={`armor-grid-${index}`} item xs>
                <ChoiceCard
                  cardText={choice.text}
                  special={index}
                  picked={_.includes(this.props.user.armor, choice)}
                  onClick={() => { this.chooseArmor(choice) }} />
              </GridItem>
            );
          })}
        </GridItem>
        <NoChoiceCard cardText={this.props.armor_traits.opening} />
        <GridItem container spacing={24} justify='space-evenly'>
          {_.map(this.props.armor_traits.choices, (choice, index) => {
            return (
              <GridItem key={`armor_traits-grid-${index}`} item xs>
                <ChoiceCard
                  cardText={choice.text}
                  special={index}
                  picked={_.includes(this.props.user.armor_traits, choice)}
                  onClick={() => { console.log('clicked') }} />
              </GridItem>
            );
          })}
        </GridItem>
        <NoChoiceCard cardText={this.props.weapons.opening} />
        <GridItem container spacing={24} justify='space-evenly'>
          {_.map(this.props.weapons.choices, (choice, index) => {
            return (
              <GridItem key={`weapons-grid-${index}`} item xs>
                <ChoiceCard
                  cardText={choice.text}
                  special={index}
                  picked={_.includes(this.props.user.weapons, choice)}
                  onClick={() => { this.chooseWeapon(choice); }} />
              </GridItem>
            );
          })}
        </GridItem>
      </div>
    );
  }
}

