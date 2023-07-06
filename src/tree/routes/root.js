const endpoint = require('express').Router();

endpoint.get("/", (req, res) => {
   res.send('Your app is listening on port 3001<br>'+
            'The connection with PostgreSQL has been successfully established.<br>'+
            'Dogs Model is already coincident!<br>'+
            'Temperaments Model is already coincident!<br>'+
            'The model for the Temperament Set is already coincident!<br>'+
            'Associations already in place!!!<br>');
});

module.exports = endpoint;