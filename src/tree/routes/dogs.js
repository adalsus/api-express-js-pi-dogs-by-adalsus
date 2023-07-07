const endpoint = require('express').Router();


endpoint.get("/", (req, res) => {
   res.send('endpoint dogs');
});



module.exports = endpoint;