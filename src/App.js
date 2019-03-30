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
                  <Link to="/about/">About</Link>
                </li>
                <li>
                  <Link to="/users/">Users</Link>
                </li>
              </ul>
            </nav>

            <Route path="/" exact component={Opening} />
            <Route path="/about/" component={Special} />
          </div>
        </Router>
        <BottomNavigation setBottomTab={this.setBottomTab.bind(this)} />
      </div>
    );
  }
}

export default App;
