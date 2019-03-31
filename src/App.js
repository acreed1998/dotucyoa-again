import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import CYOAData from './data/json_for_index.json';
import BottomNavigation from './components/BottomNavigation';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Opening from './routes/Opening';
import Special from './routes/Special';
import RaceAndAbilities from './routes/RaceAndAbilities';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 'Opening',
      user: {
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
  }

  changeRace(raceArray) {
    const user = this.state.user;
    user.race = raceArray;
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
            />} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
