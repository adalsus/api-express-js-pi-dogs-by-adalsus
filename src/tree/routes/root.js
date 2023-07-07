require('dotenv').config()
const endpoint = require('express').Router();
const { PORT } = process.env;


endpoint.get("/", (req, res) => {
   res.send(`Your app is listening on port ${PORT}<br>`+
            'The connection with PostgreSQL has been successfully established.<br>'+
            'Dogs Model is already coincident!<br>'+
            'Temperaments Model is already coincident!<br>'+
            'The model for the Temperament Set is already coincident!<br>'+
            'Associations already in place!!!<br>');
});



module.exports = endpoint;