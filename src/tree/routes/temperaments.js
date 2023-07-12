const endpoint = require('express').Router();
require('dotenv').config();
const hostname = require('./dogs.js').hostname;
const { _API_KEY } = require('../../sequelize/db.js');


endpoint.get("/", async (req, res) => {
   //res.send('endpoint temperaments');
   if (require('fs').existsSync('./src/var/dataGt_g.json')) {
      const { gTempsI_Gt } = require('../../fns/fnsApi.js')
      let dataJSON = await gTempsI_Gt(hostname,_API_KEY)
      res.json(dataJSON)
   } else {
      res.json({'error': 'Realice primero la petición /dogs para actualizar todas las combinaciones de temperamentos existentes'})
   }
});



module.exports = endpoint;