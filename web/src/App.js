import React, { Component } from 'react';
import logo from './logo.png';
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
  },
  {
    'name': 'strawberry',
    'status': 'low fodmap'
  }
];

const foodItemsBoxes = food.map((food) => {
    const fodmapStyle = food.status === 'high fodmap' ? 'App-high' : 'App-low';
    const classes = `${fodmapStyle} boxes`;
    return <div key={food.id} className={classes}>
      {food.name}
    </div>
  }
);

function UserInput() {
  return (
    <form>
      <label>
        Ingredient:
            <input type="text" name="name" />
      </label>
    </form>
  );
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">fodmap</h1>
        </header>
        <UserInput></UserInput>
        {foodItemsBoxes}
      </div>
    );
  }
}

export default App;
