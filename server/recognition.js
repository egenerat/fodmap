'use strict';
const Clarifai = require('clarifai');
const { CLARIFAI_API_KEY } = require('./secrets.js');
const constants = require('./constants.js');

const app = new Clarifai.App({
  apiKey: CLARIFAI_API_KEY
});

const isHighFodmapFood = (imgDescriptors) => {
  return imgDescriptors.some( desc => constants.HIGH_FODMAP_FOOD.includes(desc) );
  // TODO: could be changed by filter to show what are the risky ingredients
};

const isThatFood = (imgDescriptors) => {
  return imgDescriptors.includes('food');
};

const recognition = (picture) => {
  // picture being an URL or a base64 encoded image
  return app.models.predict(Clarifai.GENERAL_MODEL, picture).then(
    (response) => {
      let result;
      if (response.status.code === 10000) {
        let descriptors = response.outputs[0].data.concepts.map((element) => element.name);
        let guessFoodName = descriptors[0];
        console.log(descriptors);
        if (isThatFood(descriptors)) {
          if (isHighFodmapFood(descriptors)) {
            console.log('Tasty, but not safe ✋');
            result = constants.HIGH_FODMAP;
          }
          else {
            console.log('Yeahh, no risk 😋');
            result = constants.LOW_FODMAP;
          }
        }
        else {
          // Filter the cases where the food is not recognized
          console.log('Are you sure it is food? 😱');
          result = constants.NOT_FOOD;
        }
        return Promise.resolve({
          guessFoodName: guessFoodName,
          result: result
        });
      }
      return Promise.resolve({
        error: result
      });
    }, (err) => {
      console.log('failure calling recognition API');
      console.log(err);
      return Promise.resolve('RECOGNITION_ERROR');
    });
};
module.exports.recognition = recognition;