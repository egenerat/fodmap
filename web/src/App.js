import React, { Component } from 'react';
import logo from './logo.png';
import strawberry from './strawberry.jpg';
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
  return <Card foodData={food}/>
});

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function Card(props) {
  const fodmapStyle = props.foodData.fodmap === 'high' ? 'red lighten-4' : 'green lighten-4';
  const classes = `card small ${fodmapStyle}`;
  return (
    <div class={classes}>
      <div class="card-image waves-effect waves-block waves-light">
        <img alt="{props.foodData.name}" class="activator" src={strawberry} />
      </div>
      <div class="card-content">
        <span class="card-title activator grey-text text-darken-4">{capitalizeFirstLetter(props.foodData.name)}<i class="material-icons right">more</i></span>
      </div>
      <div class="card-reveal">
        <span class="card-title grey-text text-darken-4">More details: {capitalizeFirstLetter(props.foodData.name)}<i class="material-icons right">close</i></span>
        <p>Here is some more information about this product that is only revealed once clicked on.</p>
        <p>Alternatives: {props.foodData.alternatives}</p>
      </div>
    </div>
  );
}


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
        <div style={{clear: "both"}}></div>
      </div>
    );
  }
}

export default App;
