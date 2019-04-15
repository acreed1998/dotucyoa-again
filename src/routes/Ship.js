import React, { Component } from "react";
import NoChoiceCard from '../components/NoChoiceCard';
import ChoiceCard from '../components/ChoiceCard';
import _ from 'lodash';
import GridItem from '@material-ui/core/Grid';
import UpgradeCard from "../components/UpgradeCard";
// import MultiChoiceCard from '../components/MultiChoiceCard';

export default class Ship extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.chooseShip = this.chooseShip.bind(this);
    this.chooseShipStyle = this.chooseShipStyle.bind(this);
    this.chooseBasicShipTrait = this.chooseBasicShipTrait.bind(this);
    this.basicOrUpgrade = this.basicOrUpgrade.bind(this);
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

  chooseBasicShipTrait(shipTraitObject) {
    const user = this.props.user;
    const ship_traits = user.ship_traits;
    const points = user.points;
    const ship = user.ship;
    if (!_.includes(ship_traits.basic, shipTraitObject)) {
      if (points - shipTraitObject.basic > -1) {
        if (shipTraitObject.weapon) {
          if (ship.main_weapons - _.filter(ship_traits.basic, trait => trait.weapon === true).length - 1 > -1) {
            ship_traits.basic.push(shipTraitObject);
            this.props.modifyShipTraits(ship_traits);
          } else {
            if (ship.main_weapons === 1) {
              _.remove(ship_traits.basic, trait => trait.weapon === true);
              ship_traits.basic.push(shipTraitObject);
              this.props.modifyShipTraits(ship_traits);
            }
          }
        } else {
          ship_traits.basic.push(shipTraitObject);
          this.props.modifyShipTraits(ship_traits);
        }
      }
    } else {
      _.pullAt(ship_traits.basic, _.indexOf(ship_traits.basic, shipTraitObject));
      this.props.modifyShipTraits(ship_traits);
    }
  }

  basicOrUpgrade(shipTraitObject, boru) {
    const user = this.props.user;
    const ship_traits = user.ship_traits;
    const numOfCurrentTrits = ship_traits.upgrade.length + _.filter(ship_traits.basic, traitObject => traitObject.basic > 0).length;
    const points = user.points;
    if (boru === 'upgrade') {
      if (_.includes(ship_traits.basic, shipTraitObject)) {
        _.pullAt(ship_traits.basic, _.indexOf(ship_traits.basic, shipTraitObject));
      } else if (_.includes(ship_traits.upgrade, shipTraitObject)) {
        _.pullAt(ship_traits.upgrade, _.indexOf(ship_traits.upgrade, shipTraitObject));
        this.props.modifyShipTraits(ship_traits);
        return 'Removed the Item';
      }
      if (points - (shipTraitObject.basic + shipTraitObject.upgrade) > -1) {
        if (user.ship.traits - (numOfCurrentTrits + 1) > -1) {
          ship_traits.upgrade.push(shipTraitObject);
          this.props.modifyShipTraits(ship_traits);
        }
      }
    } else if (boru === 'basic') {
      if (_.includes(ship_traits.upgrade, shipTraitObject)) {
        _.pullAt(ship_traits.upgrade, _.indexOf(ship_traits.upgrade, shipTraitObject));
      } else if (_.includes(ship_traits.basic, shipTraitObject)) {
        _.pullAt(ship_traits.basic, _.indexOf(ship_traits.basic, shipTraitObject));
        this.props.modifyShipTraits(ship_traits);
        return 'Removed the Item';
      }
      if (points - shipTraitObject.basic > -1) {
        if (user.ship.traits - (numOfCurrentTrits + 1) > -1) {
          ship_traits.basic.push(shipTraitObject);
          this.props.modifyShipTraits(ship_traits);
        }
      }
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
            if (choice.upgrade) {
              return (
                <GridItem key={`ship_traits-grid-${index}`} item xs>
                  <UpgradeCard
                    cardText={choice.text}
                    special={index}
                    picked={(_.includes(this.props.user.ship_traits.basic, choice) || _.includes(this.props.user.ship_traits.upgrade, choice))}
                    basic={() => { this.basicOrUpgrade(choice, 'basic') }}
                    upgrade={() => { this.basicOrUpgrade(choice, 'upgrade') }}
                    />
                </GridItem>
              );
            } else {
              return (
                <GridItem key={`ship_traits-grid-${index}`} item xs>
                  <ChoiceCard
                    cardText={choice.text}
                    special={index}
                    picked={_.includes(this.props.user.ship_traits.basic, choice)}
                    onClick={() => { this.chooseBasicShipTrait(choice) }} />
                </GridItem>
              );
            }
          })}
        </GridItem>
      </div>
    );
  }
}

