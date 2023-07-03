const endpoint = require('express').Router();

endpoint.get("/", (req, res) => {
   res.send('Hello World!!!');
});

module.exports = endpoint;