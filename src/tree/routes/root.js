const endpoint = require('express').Router();

endpoint.get("/", (req, res) => {
   res.send('The connection with PostgreSQL has been successfully established ...');
});

module.exports = endpoint;