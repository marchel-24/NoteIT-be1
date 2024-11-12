const express = require('express');
const app = express();

app.get('/test', (req, res) => {
    res.status(200).json({
        message: 'Success'
    });
});

module.exports = app;