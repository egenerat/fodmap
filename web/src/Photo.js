import React from 'react';
import loading from './loading.gif';

const processResult = (res) => {
  if (res.guessFoodName) {
      return `${res.guessFoodName} is ${res.result}`;
  }
  else {
      return 'Not recognized, is that food?';
  }
}

class Photo extends React.Component {
  render() {
    return (
      <form>
        <label htmlFor="file-camera">Take a picture</label>
        <input type="file" accept="image/*" capture="environment" id="file-camera" name="hole" onChange={this.props.onChangeValue} />
        <br/>
        <label htmlFor="file-upload">Upload a photo</label>
        <input type="file" accept="image/*" id="file-upload" onChange={this.props.onChangeValue} />
        <br/>

        { this.props.foodNameGuess && this.props.fodmapStatus !== 'NOT_FOOD' ? <div>{this.props.foodNameGuess} is {this.props.fodmapStatus}</div> : null }

        { this.props.isLoading ? <img src={loading} alt="loading animation" /> : null }
      </form>
    );
  }
}

class PhotoPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      foodNameGuess: '',
      fodmapStatus: '',
      error: null,
      isLoading: false
    }
    this.handleChange = this.handleChange.bind(this);
  }

  uploadFiles = (files) => {
    let photo = files[0];
    let formData = new FormData();
    formData.append("photo", photo);
    this.setState({
      isLoading: true
    });
    return fetch('https://fodmapp.herokuapp.com/upload/image', {
        method: "POST",
        body: formData,
    })
    .then(response => response.json())
    .then(jsonResponse => this.setState({
      isLoading: false,
      foodNameGuess: jsonResponse.guessFoodName,
      fodmapStatus: jsonResponse.result
    }));
  }

  handleChange(event) {
    this.uploadFiles(event.target.files);
  }

  render() {
    return (
      <Photo
        onChangeValue={this.handleChange}
        isLoading={this.state.isLoading}
        foodNameGuess={this.state.foodNameGuess}
        fodmapStatus={this.state.fodmapStatus}
      />
    );
  }
}
export default PhotoPanel;
