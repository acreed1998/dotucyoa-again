import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BottomNavigation from './components/BottomNavigation';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 'Opening',
    };
  }

  setBottomTab(value) {
    this.setState({currentTab: value});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <BottomNavigation setBottomTab={this.setBottomTab.bind(this)} />
      </div>
    );
  }
}

export default App;
