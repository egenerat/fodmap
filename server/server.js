var express = require('express');
var app = express();

const port = process.env.PORT || 8080;

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

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});