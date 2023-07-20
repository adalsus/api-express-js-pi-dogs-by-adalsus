require('dotenv').config();
const endpoint = require('express').Router();
const { EP_BREEDS_TDA,EP_BREEDS_LC } = process.env;
const { _API_KEY } = require('../../sequelize/db.js');



const You_will_work_with_external_API = 'SI' //<-Modifique a NO si trabajará con su API-example




let hostname = (You_will_work_with_external_API==='SI')
   ? EP_BREEDS_TDA
   : EP_BREEDS_LC

endpoint.get("/", async (req, res, next) => {
   const { name } = req.query
   if (name!==undefined) {
      const { gDataGtQname } = require('../../fns/fnsApi.js')
      let url_search = `${hostname}/search?q=${name}&api_key=${_API_KEY}`
      let dataJSON = await gDataGtQname(url_search,name)
      res.json(dataJSON);
   } else { next() }
})

endpoint.get("/", async (req, res) => {
   const { gDataGt } = require('../../fns/fnsApi.js')
   let dataJSON = await gDataGt(hostname,_API_KEY)
   res.json(dataJSON);
});

endpoint.get("/:id", async (req, res, next) => {
   const { id } = req.params
   //if (!isNaN(id-0)) {
      const { gDataGtXid } = require('../../fns/fnsApi.js')
      let URL_REQ = `${hostname}/${id}?api_key=${_API_KEY}`
      let dataJSON = await gDataGtXid(URL_REQ,id)
      res.json(dataJSON);
   //} else { next() }
});

const bodyParser = require('body-parser')
endpoint.post('/', bodyParser.json(), async (req, res) => {
   const dataJSON = req.body
   const insertDogSeq = require('../../sequelize/controllers/insertDogSeq.js')
   let result = await insertDogSeq(dataJSON,hostname,_API_KEY)
   res.json(result)
   require('../../fns/fnsApi.js').removeFile('./src/var/dataGt_g.json')
   const { gDataGt } = require('../../fns/fnsApi.js')
   let dataJSONGt = await gDataGt(hostname,_API_KEY)
})


module.exports = endpoint;