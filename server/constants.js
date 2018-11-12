'module strict';

const LOW_FODMAP = 'LOW_FODMAP';
const HIGH_FODMAP = 'HIGH_FODMAP';

const FOOD = [
  {
    'name': 'rice',
    'fodmap': LOW_FODMAP
  },
  {
    'name': 'onion',
    'fodmap': HIGH_FODMAP,
    'alternatives': [
      'chives'
    ]
  },
  {
    'name': 'apple',
    'fodmap': HIGH_FODMAP
  },
  {
    'name': 'garlic',
    'fodmap': HIGH_FODMAP
  },
  {
    'name': 'strawberry',
    'fodmap': LOW_FODMAP
  },
  {
    'name': 'chives',
    'fodmap': LOW_FODMAP
  }
];

// Legacy, to be replaced
const HIGH_FODMAP_FOOD = FOOD.filter(x => x.fodmap == HIGH_FODMAP);
module.exports.HIGH_FODMAP_FOOD = HIGH_FODMAP_FOOD;
module.exports.NOT_FOOD = 'NOT_FOOD';
module.exports.HIGH_FODMAP = HIGH_FODMAP;
module.exports.LOW_FODMAP = LOW_FODMAP;
module.exports.FOOD = FOOD;