const express = require('express');
const app = express();
const formidable = require('formidable');
// const util = require('util');

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

app.post('/upload/image', (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        // console.log(util.inspect({fields: fields, files: files}));
        console.log(`Upload successful: ${files.photo.name} saved as ${files.photo.path} ${files.photo.type} ${files.photo.size} bytes`);
        res.sendStatus(200);
    });
});

app.get('/photo', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});