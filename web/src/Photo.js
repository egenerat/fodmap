import React from 'react';
import loading from './loading.gif';

const processResult = (foodName, fodmap) => {
  let result = '';
  if (foodName && fodmap !== 'NOT_FOOD') {
      result += `${foodName} is `;
      result += fodmap === 'LOW_FODMAP' ? 'low' : 'high';
      result += ' fodmap';
  }
  else {
      result = 'Not recognized, is that food?';
  }
  return result;
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
        
        { this.props.foodNameGuess ? <div id="server-response">{processResult(this.props.foodNameGuess, this.props.fodmapStatus)}</div> : null }
        { this.props.error ? <div id="server-response">{this.props.error}</div> : null }
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
      fodmapStatus: jsonResponse.result,
      error: jsonResponse.error
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
        error={this.state.error}
      />
    );
  }
}
export default PhotoPanel;
