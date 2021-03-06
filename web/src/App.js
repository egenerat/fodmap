import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import logo from './logo.png';
import strawberry from './strawberry.jpg';
import PhotoPanel from './Photo.js';
import './App.css';


const styles = {
  slide: {
    padding: 15,
    minHeight: 100,
    color: '#fff',
  },
  slide1: {
    background: '#FEA900',
  },
  slide2: {
    background: '#B3DC4A',
  },
  slide3: {
    background: '#6AC0FF',
  },
};

const foodItemsBoxes = (foodItems) => foodItems.map((food, key) => {
  return <Card key={key} foodData={food}/>
});

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function Card(props) {
  const fodmapStyle = props.foodData.fodmap === 'HIGH_FODMAP' ? 'red lighten-4' : 'green lighten-4';
  const classes = `card small ${fodmapStyle}`;
  const alternativesList = props.foodData.alternatives;
  const alternatives= alternativesList? <p>Alternatives: {alternativesList}</p> : '';
  
  return (
    <div className={classes}>
      <div className="card-image waves-effect waves-block waves-light">
        <img alt="{props.foodData.name}" className="activator" src={strawberry} />
      </div>
      <div className="card-content">
        <span className="card-title activator grey-text text-darken-4">{capitalizeFirstLetter(props.foodData.name)}<i className="material-icons right">more</i></span>
      </div>
      <div className="card-reveal">
        <span className="card-title grey-text text-darken-4">More details: {capitalizeFirstLetter(props.foodData.name)}<i className="material-icons right">close</i></span>
        <p>Here is some more information about this product that is only revealed once clicked on.</p>
        {alternatives}
      </div>
    </div>
  );
}


class IngredientForm extends React.Component {

  render() {
    return (
      <form id="ingredientForm" onSubmit={this.props.handleSubmit}>
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
    this.state = {
      value: '',
      error: null,
      isLoaded: false,
      foodData: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch("https://fodmapp.herokuapp.com/api/food")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            foodData: result.items
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }


  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
  }


  getCompatibleFood(foodList, userInput) {
    return foodList.filter((ingredient) => ingredient.name.toLowerCase().startsWith(userInput.toLowerCase()))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">fodmap</h1>
        </header>
        <SwipeableViews index={1} enableMouseEvents>
          <div style={Object.assign({}, styles.slide, styles.slide1)}>
            <PhotoPanel/>
          </div>
          <div style={Object.assign({}, styles.slide, styles.slide2)}>
            <IngredientForm
            onChangeValue={this.handleChange}
            onSubmit={this.onSubmit}
          />
          {foodItemsBoxes(this.getCompatibleFood(this.state.foodData, this.state.value))}
          <div style={{clear: "both"}}></div>
          </div>
        </SwipeableViews>
      </div>
    );
  }
}

export default App;
