const endpoint = require('express').Router();


const bodyParser = require('body-parser')
endpoint.post("/", bodyParser.json(), async (req, res) => {
   const dataJSON = req.body
   const insertTempseq = require('../../sequelize/controllers/insertTempseq.js')
   let result = await insertTempseq(dataJSON)
   res.json(result)
})


module.exports = endpoint;

