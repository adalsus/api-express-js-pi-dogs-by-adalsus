const fdeco = require('./fnB_deco.js');
const axios = require('axios')

const last_idDogs = async sequelize => {
   let value_id;
   await sequelize.models.Dogs.findOne({
      order: [
         ['id', 'DESC'],
      ]
   }).then(Dogs=>{
      //console.log(Dogs)
      if (Dogs!==null) {
         value_id = Dogs.id;
      }
   })
   return value_id;
};

const last_idBreeds = async url_req => {
   let value_id;
   await axios.get(url_req)
   .then(Breeds=>{
      //console.log(Breeds.data[0].id)
      if (Breeds!==null) {
         value_id = Breeds.data[0].id;
      }
   })
   return value_id;
};

const antepongo = (prefijo,numero) => {
   return parseInt(`${prefijo}${numero}`)
}

module.exports = { 
   fdeco, 
   last_idDogs,
   last_idBreeds,
   antepongo,
};
