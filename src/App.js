import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import CYOAData from './data/json_for_index.json';
import BottomNavigation from './components/BottomNavigation';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Opening from './routes/Opening';
import Special from './routes/Special';
import RaceAndAbilities from './routes/RaceAndAbilities';
import ArmorAndWeapons from './routes/ArmorAndWeapons';
import { Button } from '@material-ui/core';
import Ship from './routes/Ship';
import ChoicesModalWrapped from './components/ChoicesModal';
import _ from 'lodash';
import Team from './routes/Team';
import BoonsAndDrawbacks from './routes/BoonsAndDrawbacks';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 'Opening',
      user: {
        maxPoints: 75,
        points: 75,
        lotd_points: 0,
        time_points: 0,
        special: [],
        race: [],
        abilities: [],
        armor: [],
        armor_traits: [],
        weapons: [],
        ship: {
          type: '',
          traits: 0,
          main_weapons: 0,
        },
        ship_style: {
          type: '',
        },
        ship_traits: {
          basic: [],
          upgrade: [],
        },
        ship_weapons: [],
        team_members: [],
        boons: [],
        drawbacks: [],
        events: [],
        rewards: [],
        extra_main_weapons: 0,
        section: 'Opening'
      },
      tally: {
        race: 0,
        abilities: 0,
        armor: 0,
        time: {
          extra: 0,
          abilities: 0,
          team_members: 0,
        },
        lotd: {
          extra: 0,
          armor: 0,
          armor_traits: 0,
          weapons: 0,
          ship_type: 0,
          ship_style: 0,
          ship_traits: 0,
        },
        armor_traits: 0,
        weapons: 0,
        ship_type: 0,
        ship_style: 0,
        ship_traits: 0,
        team_members: 0,
        drawbacks: 0,
        boons: 0,
      },
      leftover: {
        lotd: 0,
        time: 0,
      },
      choicesModalOpen: false,
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
    this.modifyTeam(this.state.user.team_members);
  }

  changeRace(raceArray) {
    const raceNames = _.map(raceArray, raceObject => raceObject.race);
    const user = this.state.user;
    const tally = this.state.tally;
    tally.race = _.includes(raceNames, 'Human') ? -5 : 0;
    user.race = raceArray;
    this.setState({ user: user, tally: tally });
    this.modifyAbilities(this.state.user.abilities);
    this.modifyArmor(this.state.user.armor);
    this.modifyArmorTraits(this.state.user.armor_traits);
    this.modifyWeapons(this.state.user.weapons);
    this.changeShipStyle(this.state.user.ship_style);
    this.modifyTeam(this.state.user.team_members);
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
    tally.time.abilities = points;
    this.setState({ user: user, tally: tally });
    this.modifyPoints();
    this.modifyDrawbacks(this.state.user.drawbacks);
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
    tally.lotd.armor = _.sum(_.map(_.filter(user.armor, armorTraitObject => !_.includes(specialNames, armorTraitObject.free)), armor => {
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
    tally.lotd.armor_traits = _.sum(_.map(armorTraitsCheck, filteredAbility => filteredAbility.points));
    this.setState({ user: user, tally: tally });
    this.modifyPoints();
  }

  modifyWeapons(weaponsArray) {
    const user = this.state.user;
    const tally = this.state.tally;
    user.weapons = weaponsArray;
    const points = _.sum(_.map(weaponsArray, weapon => weapon.points));
    tally.lotd.weapons = points;
    this.setState({ user: user, tally: tally });
    this.modifyPoints();
  }

  changeShip(shipObject) {
    const user = this.state.user;
    const tally = this.state.tally;
    user.ship = shipObject;
    tally.lotd.ship_type = _.includes(_.map(this.state.user.special, specialObject => specialObject.special), 'Your Ship') ? shipObject.points !== undefined ? shipObject.points / 2 : 0 : shipObject.points;
    this.setState({ user: user, tally: tally });
    this.changeShipStyle(this.state.user.ship_style);
    this.modifyPoints();
  }

  changeShipStyle(shipStyleObject) {
    const user = this.state.user;
    const tally = this.state.tally;
    user.ship_style = shipStyleObject;
    tally.lotd.ship_style = _.includes(_.map(user.race, raceObject => raceObject.race), shipStyleObject.type) ? 0 : shipStyleObject.points;
    this.setState({ user: user, tally: tally });
    this.modifyShipTraits(this.state.user.ship_traits);
    this.modifyPoints();
  }

  modifyShipTraits(shipTraitsObject) {
    const user = this.state.user;
    const ship = user.ship;
    const tally = this.state.tally;
    let weapons = _.filter(shipTraitsObject.basic, shipTrait => shipTrait.weapon === true);
    const basicNames = _.map(shipTraitsObject.basic, shipTrait => shipTrait.trait);
    console.log(weapons);
    if (ship.main_weapons - weapons.length < 0) {
      _.pullAt(shipTraitsObject.basic, _.indexOf(shipTraitsObject.basic, weapons[weapons.length - 1]));
    }
    const upgradeNames = _.map(shipTraitsObject.upgrade, shipTrait => shipTrait.trait);
    const specialNames = _.map(user.special, specialObject => specialObject.special);
    const filteredBasic = _.filter(shipTraitsObject.basic, shipTrait => {
      if (!shipTrait.require) {
        return true;
      }
      return _.includes(_.concat(basicNames, upgradeNames, specialNames), shipTrait.require);
    });
    const filteredUpgrade = _.filter(shipTraitsObject.upgrade, shipTrait => {
      if (!shipTrait.require) {
        return true;
      }
      return _.includes(_.concat(basicNames, upgradeNames, specialNames), shipTrait.require);
    });
    user.ship_traits = {
      basic: filteredBasic,
      upgrade: filteredUpgrade,
    };
    const basicPoints = _.sum(_.map(_.filter(filteredBasic, filteredObject => !_.isEqual(user.ship_style.type, filteredObject.free)), shipTrait => {
      return shipTrait.trait !== 'Command Bridge' ? shipTrait.basic : (user.ship.type !== 'Frigate' && user.ship.type !== '') ? 0 : 1;
    }));
    const upgradePoints = _.sum(_.map(filteredUpgrade, shipTrait => shipTrait.basic + shipTrait.upgrade));
    tally.lotd.ship_traits = basicPoints + upgradePoints;
    this.setState({user: user, tally: tally});
    this.modifyPoints();
    this.modifyDrawbacks(this.state.user.drawbacks);
  }

  modifyTeam(teamMembersArray) {
    const user = this.state.user;
    const tally = this.state.tally;
    const boonNames = _.map(user.boons, boonObject => boonObject.name);
    const specialNames = _.map(user.special, specialObject => specialObject.special);
    const filteredMembers = _.filter(teamMembersArray, memberObject => {
      if (memberObject.restriction) {
        return _.includes(specialNames, memberObject.restriction);
      } else {
        return true;
      }
    });
    user.team_members = filteredMembers;
    if (_.includes(specialNames, 'Your Team')) {
      const restrictedMembers = _.filter(filteredMembers, memberObject => memberObject.restriction !== undefined);
      const unrestrictedMembers = _.filter(filteredMembers, memberObject => memberObject.restriction === undefined);
      const umMappedPointValues = _.map(unrestrictedMembers, memberObject => {
        return !(memberObject.gender === 'female' && _.includes(boonNames, 'Hello Ladies...')) ? memberObject.points : memberObject.points - 1 < 1 ? 1 : memberObject.points - 1;
      }).sort();
      const rmMappedPointValues = _.map(restrictedMembers, memberObject => {
        return !(memberObject.gender === 'female' && _.includes(boonNames, 'Hello Ladies...')) ? memberObject.points : memberObject.points - 1 < 1 ? 1 : memberObject.points - 1;
      });
      tally.time.team_members = _.sum(_.slice(umMappedPointValues, 0, umMappedPointValues.length - 2)) + _.sum(rmMappedPointValues);
    } else {
      tally.time.team_members = _.sum(_.map(filteredMembers, memberObject => {
        return !(memberObject.gender === 'female' && _.includes(boonNames, 'Hello Ladies...')) ? memberObject.points : memberObject.points - 1 < 1 ? 1 : memberObject.points - 1;
      }));
    }
    this.setState({user: user, tally: tally});
    this.modifyPoints();
  };

  modifyBoons(boonsArray) {
    const user = this.state.user;
    const tally = this.state.tally;
    const boonNames = _.map(boonsArray, boonObject => boonObject.name);
    user.boons = boonsArray;
    tally.time.extra = _.includes(boonNames, 'Time') ? -8 : 0;
    tally.lotd.extra = _.includes(boonNames, 'Luck of the Draw') ? -10 : 0;    
    this.setState({user: user, tally: tally});
    this.modifyDrawbacks(this.state.user.drawbacks);
  }

  modifyDrawbacks(drawbacksArray) {
    const user = this.state.user;
    const tally = this.state.tally;
    const abilitiyNames = _.map(user.abilities, ability => ability.ability);
    const shipTraitNames = _.map(user.ship_traits.basic, shipTraitsObject => shipTraitsObject.trait);
    const combo = _.concat(abilitiyNames, shipTraitNames);
    const requires = user.boons.length !== 0 ? _.sum(_.map(user.boons, boonObject => boonObject.drawbacks)) : 0;
    const filteredDrawbacks = _.filter(drawbacksArray, drawbackObject => {
      if (drawbackObject.requires) {
        for (let i = 0; i < drawbackObject.requires.length; i++) {
          if (_.includes(combo)) {
            return true;
          }
        }
        return false;
      } else if (drawbackObject.no) {
        return !_.includes(abilitiyNames, drawbackObject.no);
      } else {
        return true;
      }
    });
    user.drawbacks = filteredDrawbacks;
    tally.drawbacks = filteredDrawbacks.length - requires > 0 ? -(filteredDrawbacks.length - requires) * 3 : 0;
    this.setState({user: user, tally: tally});
    this.modifyPoints();
  };

  modifyMaxPoints(points) {
    const user = this.state.user;
    user.maxPoints = 75 + points;
    this.setState({user: user});
  }

  modifyPoints() {
    const user = this.state.user;
    user.points = 75 - _.sum(_.map(this.state.tally, (value) => {
      if (typeof value === 'object') {
        const cost = _.sum(_.map(value, (subValue, key) => {
          return subValue;
        }));
        return cost > 0 ? cost : 0;
      } else {
        return value;
      }
    }));
    this.setState({user: user});
  }

  render() {
    const lotdPoints = Math.abs(this.state.tally.lotd.extra) - _.sum(_.map(this.state.tally.lotd, (num, key) => {
      return key !== 'extra' ? num : 0;
    }));
    const timePoints = Math.abs(this.state.tally.time.extra) - _.sum(_.map(this.state.tally.time, (num, key) => {
      return key !== 'extra' ? num : 0;
    }));
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
                modifyShipTraits={this.modifyShipTraits.bind(this)}
              />} />
              <Route path="/team/" render={() => <Team
                user={this.state.user}
                team={CYOAData.team}
                modifyTeam={this.modifyTeam.bind(this)}
              />} />
              <Route path="/bandd/" render={() => <BoonsAndDrawbacks
                user={this.state.user}
                boons={CYOAData.boons}
                drawbacks={CYOAData.drawbacks}
                modifyDrawbacks={this.modifyDrawbacks.bind(this)}
                modifyBoons={this.modifyBoons.bind(this)}
              />} />
            </div>
          </div>
          <Button style={{position: 'fixed', top: 0, left: 0, backgroundColor: 'blue'}} onClick={() => {this.setState({choicesModalOpen: !this.state.choicesModalOpen})}}>
            <div>
              {`Main: ${this.state.user.points}`}
              <br />
              {`Time: ${timePoints > 0 ? timePoints : 0}`}
              <br />
              {`LOTD: ${lotdPoints > 0 ? lotdPoints : 0}`}
            </div>
          </Button>
          <BottomNavigation setBottomTab={this.setBottomTab.bind(this)} />
          <ChoicesModalWrapped
          choicesModalOpen={this.state.choicesModalOpen}
          onClose={() => {this.setState({choicesModalOpen: !this.state.choicesModalOpen})}}
          user={this.state.user}
          />
        </Router>
      </div>
    );
  }
}

export default App;
