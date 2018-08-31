import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const food = [
  {
    'name': 'rice',
    'status': 'low fodmap'
  },
  {
    'name': 'onion',
    'status': 'high fodmap'
  },
  {
    'name': 'apple',
    'status': 'high fodmap'
  }
];

const foodItems = food.map((food) =>
  <li key={food.id}>
    {food.name}: {food.status}
  </li>
);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">fodmap</h1>
        </header>
        <form>
          <label>
            Name:
            <input type="text" name="name" />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <ul>{foodItems}</ul>
      </div>
    );
  }
}

export default App;
