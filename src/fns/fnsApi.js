const fdeco = require('./fnB_deco.js');

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

const last_idBreeds = async url_base => {
   let value_id;
   await axios()
   .then(Breeds=>{
      //console.log(Dogs)
      if (Breeds!==null) {
         value_id = Breeds.id;
      }
   })
   return value_id;
};

module.exports = { 
   fdeco, 
   last_idDogs,
   last_idBreeds,
};
