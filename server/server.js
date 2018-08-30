var express = require('express');
var app = express();

app.get('/api/food', (req, res) => {
    res.json([
        {
            'name': 'apple',
            'status': 'high fodmap'
        }, {
            'name': 'rice',
            'status': 'low fodmap'
        }]);
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});