import React, { Component } from 'react';
import './App.css';
import Controller from './components/Controller';

const logo = require('./raspberry_pi_logo.png')

class App extends Component {
  render() {
    return (
      <div className="App">

        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <h1 className="App-title">Socket IO test</h1>
        </header>

        <Controller ip="192.168.0.24:8000" />

      </div>
    );
  }
}

export default App;
