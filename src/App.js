import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CYOAData from './data/json_for_index.json';
import BottomNavigation from './components/BottomNavigation';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Opening from './routes/Opening';
import Special from './routes/Special';

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
        armor: '',
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

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/special/">About</Link>
                </li>
              </ul>
            </nav>
            <BottomNavigation setBottomTab={this.setBottomTab.bind(this)} />
            <Route path="/" exact render={() => <Opening openingText={CYOAData.opening} />} />
            <Route path="/special/" render={() => <Special special={CYOAData.special} />} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
