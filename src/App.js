import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import CYOAData from './data/json_for_index.json';
import BottomNavigation from './components/BottomNavigation';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Opening from './routes/Opening';
import Special from './routes/Special';
import RaceAndAbilities from './routes/RaceAndAbilities';
import ArmorAndWeapons from './routes/ArmorAndWeapons';
import { Button } from '@material-ui/core';
import Ship from './routes/Ship';
import _ from 'lodash';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 'Opening',
      user: {
        maxPoints: 75,
        points: 75,
        special: [],
        race: [],
        abilities: [],
        armor: [],
        armor_traits: [],
        weapons: [],
        ship: {},
        ship_style: {},
        ship_traits: [],
        team_members: [],
        boons: [],
        drawbacks: [],
        events: [],
        rewards: [],
        extra_main_weapons: 0,
        section: 'Opening'
      },
      tally: {
        abilities: 0,
        armor: 0,
        armor_traits: 0,
        weapons: 0,
        ship_type: 0,
        ship_style: 0,
        ship_traits: 0,
        team_members: 0,
      },
    };
    console.log(CYOAData);
  }

  setBottomTab(value) {
    this.setState({currentTab: value});
  }

  changeSpecial(specialArray) {
    const user = this.state.user;
    user.special = specialArray;
    this.setState({ user: user });
    this.modifyAbilities(this.state.user.abilities);
    this.modifyArmor(this.state.user.armor);
    this.changeShip(this.state.user.ship);
  }

  changeRace(raceArray) {
    const extra = _.sum(_.map(raceArray, race => race.extra_points === undefined ? 0 : race.extra_points));
    const user = this.state.user;
    user.race = raceArray;
    this.setState({ user: user });
    this.modifyMaxPoints(extra);
    this.modifyAbilities(this.state.user.abilities);
    this.changeShipStyle(this.state.user.ship_style);
  }

  modifyAbilities(abilitiesArray) {
    const tally = this.state.tally;
    const abilityNames = _.map(abilitiesArray, ability => ability.ability);
    const specialNames = _.map(this.state.user.special, special => special.special);
    const abiltiyCheck = [];
    const userRaces = _.map(this.state.user.race, race => race.race);
    _.forEach(abilitiesArray, ability => {
      if (_.includes(_.concat(abilityNames, specialNames), _.values(ability.restriction)[0])) {
        abiltiyCheck.push(ability);
      } else if (!ability.restriction) {
        abiltiyCheck.push(ability);
      }
    });
    const user = this.state.user;
    user.abilities = abiltiyCheck;
    const points = _.sum(_.map(_.filter(abiltiyCheck, ability => !_.includes(_.concat(userRaces, specialNames), ability.free)), filteredAbility => filteredAbility.points));
    tally.abilities = points;
    this.setState({ user: user, tally: tally });
    this.modifyPoints();
  }

  modifyArmor(armorArray) {
    const user = this.state.user;
    const tally = this.state.tally;
    const specialNames = _.map(user.special, specialObject => specialObject.special);
    user.armor = _.sortBy(armorArray, ['traits']);
    if (user.armor[user.armor.length - 1]) {
      if (user.armor[user.armor.length - 1].traits - user.armor_traits.length < 0) {
        user.armor_traits = _.slice(user.armor_traits, 0, user.armor[user.armor.length - 1].traits);
      }
    }
    tally.armor = _.sum(_.map(_.filter(user.armor, armorTraitObject => !_.includes(specialNames, armorTraitObject.free)), armor => {
      if (!armor.half) {
        return armor.points
      } else {
        if (_.includes(_.map(user.special, specialObject => specialObject.special), armor.half)) {
          return armor.points / 2;
        } else {
          return armor.points;
        }
      }
    }));
    this.setState({user: user, tally: tally});
    this.modifyArmorTraits(this.state.user.armor_traits);
    this.modifyPoints();
  }

  modifyArmorTraits(armorTraitsArray) {
    const user = this.state.user;
    const tally = this.state.tally;
    const armorNames = _.map(user.armor, armorObject => armorObject.type);
    const specialNames = _.map(user.special, specialObject => specialObject.special);
    const armorTraitNames = _.map(user.armor_traits, armorTraitObject => armorTraitObject.trait);
    const combo = _.concat(armorNames, specialNames, armorTraitNames);
    const armorTraitsCheck = [];
    _.forEach(armorTraitsArray, armorTrait => {
      if (!armorTrait.restriction) {
        armorTraitsCheck.push(armorTrait);
      } else if (_.filter(combo, name => _.includes(armorTrait.restriction, name)).length === armorTrait.restriction.length) {
        armorTraitsCheck.push(armorTrait);
      } else if (_.includes(armorTrait.restriction, "Powered Armor") && _.includes(armorTrait.restriction, "Mech Suit")) {
        if (_.filter(combo, name => _.includes(armorTrait.restriction, name)).length === armorTrait.restriction.length - 1) {
          armorTraitsCheck.push(armorTrait);
        }
      }
    });
    user.armor_traits = armorTraitsCheck;
    tally.armor_traits = _.sum(_.map(armorTraitsCheck, filteredAbility => filteredAbility.points));
    this.setState({ user: user, tally: tally });
    this.modifyPoints();
  }

  modifyWeapons(weaponsArray) {
    const user = this.state.user;
    const tally = this.state.tally;
    user.weapons = weaponsArray;
    const points = _.sum(_.map(weaponsArray, weapon => weapon.points));
    tally.weapons = points;
    this.setState({ user: user, tally: tally });
    this.modifyPoints();
  }

  changeShip(shipObject) {
    const user = this.state.user;
    const tally = this.state.tally;
    user.ship = shipObject;
    tally.ship_type = _.includes(_.map(this.state.user.special, specialObject => specialObject.special), 'Your Ship') ? shipObject.points / 2 : shipObject.points;
    this.setState({ user: user, tally: tally });
    this.modifyPoints();
  }

  changeShipStyle(shipStyleObject) {
    const user = this.state.user;
    const tally = this.state.tally;
    user.ship_style = shipStyleObject;
    tally.ship_style = _.includes(_.map(user.race, raceObject => raceObject.race), shipStyleObject.type) ? 0 : shipStyleObject.points;
    this.setState({ user: user, tally: tally });
    this.modifyPoints();
  }

  modifyShipTraits(shipTraitsArray) {

  }

  modifyMaxPoints(points) {
    const user = this.state.user;
    user.maxPoints = 75 + points;
    this.setState({user: user});
  }

  modifyPoints() {
    const user = this.state.user;
    user.points = user.maxPoints - _.sum(_.map(this.state.tally, (value) => value));
    this.setState({user: user});
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <div>{`Defender of the Universe`}</div>
            <div>
              <Route path="/" exact render={() => <Opening openingText={CYOAData.opening} />} />
              <Route path="/special/" render={() => <Special
                special={CYOAData.special}
                user={this.state.user}
                changeSpecial={this.changeSpecial.bind(this)} />} />
              <Route path="/randa/" render={() => <RaceAndAbilities
                user={this.state.user}
                races={CYOAData.race}
                abilities={CYOAData.abilities}
                changeRace={this.changeRace.bind(this)}
                modifyAbilities={this.modifyAbilities.bind(this)}
                modifyPoints={this.modifyPoints.bind(this)}
              />} />
              <Route path="/arandw/" render={() => <ArmorAndWeapons
                user={this.state.user}
                armor={CYOAData.armor}
                armor_traits={CYOAData.armor_traits}
                weapons={CYOAData.weapons}
                modifyWeapons={this.modifyWeapons.bind(this)}
                modifyArmor={this.modifyArmor.bind(this)}
                modifyArmorTraits={this.modifyArmorTraits.bind(this)}
              />} />
              <Route path="/ship/" render={() => <Ship
                user={this.state.user}
                ship={CYOAData.ship}
                ship_style={CYOAData.ship_style}
                ship_traits={CYOAData.ship_traits}
                changeShip={this.changeShip.bind(this)}
                changeShipStyle={this.changeShipStyle.bind(this)}
              />} />
            </div>
          </div>
          <Button style={{position: 'fixed', top: 0, left: 0, backgroundColor: 'blue'}}>{this.state.user.points}</Button>
          <BottomNavigation setBottomTab={this.setBottomTab.bind(this)} />
        </Router>
      </div>
    );
  }
}

export default App;
