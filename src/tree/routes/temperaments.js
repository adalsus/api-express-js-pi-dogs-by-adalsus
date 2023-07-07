const endpoint = require('express').Router();


endpoint.get("/", (req, res) => {
   res.send('endpoint temperaments');
});



module.exports = endpoint;