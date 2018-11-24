import React from 'react';

const processServerResponse = (res) => {
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

        <h1 id="loading" style={{display: "none"}}>loading</h1>
        <div id="server-response"></div>
      </form>
    );
  }
}

class PhotoPanel extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    // this.uploadFiles = this.uploadFiles.bind(this);
  }

  uploadFiles(files) {
    let photo = files[0];
    let formData = new FormData();
    formData.append("photo", photo);
    let xhr = new XMLHttpRequest();
    xhr.open("POST", 'https://fodmapp.herokuapp.com/upload/image');
    xhr.responseType = 'json';
    console.log('OPENED', xhr.readyState);
    document.getElementById("loading").style.display = 'inline';
    xhr.onprogress = function () {
        console.log('LOADING', xhr.readyState);
    };
    xhr.onload = function () {
        console.log('DONE', xhr.readyState);
        console.log(xhr.response);
        document.getElementById('server-response').innerHTML = processServerResponse(xhr.response);
        document.getElementById("loading").style.display = 'none';
    };
    xhr.send(formData);
  }

  handleChange(event) {
    // this.setState({ value: event.target.value });
    this.uploadFiles(event.target.files)
  }

  render() {
    return (
      <Photo
        onChangeValue={this.handleChange}
      />
    );
  }
}
export default PhotoPanel;
