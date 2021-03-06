'use strict';
const express = require('express');
const app = express();
const formidable = require('formidable');
var fs = require('fs');
const { recognition } = require('./recognition.js');
const constants = require('./constants.js');
// const util = require('util');

const port = process.env.PORT || 8080;

app.use(function(req, res, next) {
  // Enable CORS: only useful if frontend and API are hosted on different servers
  // res.header('Access-Control-Allow-Origin', '*');
  // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


app.get('/api/food', (req, res) => {
  res.json({items: constants.FOOD});
});

app.post('/upload/image', (req, res) => {
  var form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    // console.log(util.inspect({fields: fields, files: files}));
    if (files.photo) {
      console.log(`Upload successful: ${files.photo.name} saved as ${files.photo.path} ${files.photo.type} ${files.photo.size} bytes`);
      const imageAsBase64 = fs.readFileSync(files.photo.path, 'base64');
      recognition(imageAsBase64)
        .then(response => res.json(response));
    }
    else {
      res.json({error: 'Upload incorrect'});
    }
  });
});

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});