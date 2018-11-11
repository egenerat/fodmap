'use strict';
const Clarifai = require('clarifai');
const { CLARIFAI_API_KEY } = require('./secret-keys.js');
const { HIGH_FODMAP_FOOD } = require('./constants.js');

const app = new Clarifai.App({
  apiKey: CLARIFAI_API_KEY
});

const isHighFodmapFood = (imgDescriptors) => {
  return imgDescriptors.some( desc => HIGH_FODMAP_FOOD.includes(desc) );
  // TODO: could be changed by filter to show what are the risky ingredients
};

const isThatFood = (imgDescriptors) => {
  return imgDescriptors.includes('food');
};

const recognition = (picture) => {
  // picture being an URL or a base64 encoded image
  app.models.predict(Clarifai.GENERAL_MODEL, picture).then(
    (response) => {
      if (response.status.code === 10000) {
        let descriptors = response.outputs[0].data.concepts.map((element) => element.name);
        console.log(descriptors);
        if (isThatFood(descriptors)) {
          if (isHighFodmapFood(descriptors)) {
            console.log('Tasty, but not safe ✋');
          }
          else {
            console.log('Yeahh, no risk 😋');
          }
        }
        else {
          // Filter the cases where the food is not recognized
          console.log('Are you sure it is food? 😱');
        }
      }
    }, (err) => {
      console.log('failure calling recognition API');
      console.log(err);
    });
};
module.exports.recognition = recognition;