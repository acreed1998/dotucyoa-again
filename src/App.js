import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import CYOAData from './data/json_for_index.json';
import BottomNavigation from './components/BottomNavigation';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Opening from './routes/Opening';
import Special from './routes/Special';
import RaceAndAbilities from './routes/RaceAndAbilities';
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
        weapons: [],
        ship_type: '',
        ship_style: '',
        ship_traits: [],
        team_members: [],
        boons: [],
        drawbacks: [],
        events: [],
        rewards: [],
        section: 'Opening'
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
  }

  changeRace(raceArray) {
    const user = this.state.user;
    user.race = raceArray;
    this.setState({ user: user });
    this.modifyAbilities(this.state.user.abilities);
  }

  modifyAbilities(abilitiesArray) {
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
    const points = 75 - _.sum(_.map(_.filter(abiltiyCheck, ability => !_.includes(userRaces, ability.free)), filteredAbility => filteredAbility.points));
    this.setState({ user: user });
    this.modifyPoints(points);
  }

  modifyPoints(points) {
    const user = this.state.user;
    user.points = points;
    this.setState({ user: user });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <div>Defender of the Universe</div>
            <BottomNavigation setBottomTab={this.setBottomTab.bind(this)} />
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
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
