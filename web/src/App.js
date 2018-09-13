import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';

const foodData = [
  {
    'name': 'rice',
    'fodmap': 'low'
  },
  {
    'name': 'onion',
    'fodmap': 'high',
    'alternatives': [
      'chives'
    ]
  },
  {
    'name': 'apple',
    'fodmap': 'high'
  },
  {
    'name': 'strawberry',
    'fodmap': 'low'
  },
  {
    'name': 'chives',
    'fodmap': 'low'
  }
];


const foodItemsBoxes = (foodItems) => foodItems.map((food) => {
  const fodmapStyle = food.fodmap === 'high' ? 'App-high' : 'App-low';
    const classes = `${fodmapStyle} boxes`;
    return <div key={food.name} className={classes}>
      {food.name}
    </div>
});


class IngredientForm extends React.Component {

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <label>
          Ingredient:
          <input type="text" value={this.props.value} onChange={this.props.onChangeValue} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
  }

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
  }


  getCompatibleFood(userInput) {
    return foodData.filter((ingredient) => ingredient.name.toLowerCase().startsWith(userInput.toLowerCase()))
}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">fodmap</h1>
        </header>
        <IngredientForm
          onChangeValue={this.handleChange}
          onSubmit={this.onSubmit}
        />
        {foodItemsBoxes(this.getCompatibleFood(this.state.value))}
      </div>
    );
  }
}

export default App;
