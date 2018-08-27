'use strict';
const Clarifai = require('clarifai');
const { CLARIFAI_API_KEY } = require('./secret-keys.js');

const app = new Clarifai.App({
  apiKey: CLARIFAI_API_KEY
});


const HIGH_FODMAP_FOOD = ['apple', 'onion'];

const isHighFodmapFood = (imgDescriptors) => {
  return imgDescriptors.some( desc => HIGH_FODMAP_FOOD.includes(desc) );
  // TODO: could be changed by filter to show what are the risky ingredients
};

const recognition = (url) => {
  app.models.predict(Clarifai.GENERAL_MODEL, url).then(
    (response) => {
      if (response.status.code === 10000) {
        let descriptors = response.outputs[0].data.concepts.map((element) => element.name);
        console.log(descriptors);
        if (isHighFodmapFood(descriptors)) {
          console.log('Tasty, but not safe');
        }
        else {
          console.log('Yeahh, no risk');
        }
      }
    }, (err) => {
      console.log('failure calling recognition API');
      console.log(err);
    });
};


let carbonaraPasta = 'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--1001491_11.jpg?itok=-ns0A_kt';
let apple = 'https://regmedia.co.uk/2015/09/23/apple_98e475983475.jpg?x=1200&y=794';
recognition(apple);