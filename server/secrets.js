'use strict';
let CLARIFY_KEY;
if(process.env.CLARIFAI_API_KEY) {
  CLARIFY_KEY = process.env.CLARIFAI_API_KEY;
}
else {
  const { CLARIFAI_API_KEY } = require('./secret-keys.js');
  CLARIFY_KEY = CLARIFAI_API_KEY;
}
module.exports.CLARIFAI_API_KEY = CLARIFY_KEY;