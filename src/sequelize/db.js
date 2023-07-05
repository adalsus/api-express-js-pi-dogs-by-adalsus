require('dotenv').config();
const { fdeco } = require('../fns/fnsApi.js');

const { DB_USER,DB_PASSWORD,DB_HOST,DB_PORT,DB_NAME,API_KEY,EP_BREEDS_TDA,URI_CLOUD } = process.env;
const _DB_USER = fdeco(JSON.parse(DB_USER))
const _DB_PASSWORD = fdeco(JSON.parse(DB_PASSWORD))
const _API_KEY = fdeco(JSON.parse(API_KEY))
const _URI_CLOUD = fdeco(JSON.parse(URI_CLOUD))

const eresAdalbertoMonar = "SI"
const PostgreSQL_LOCAL = "NO"
const postgresql_uri = ( eresAdalbertoMonar==='SI' )
?(PostgreSQL_LOCAL==='SI')
  ?`postgres://${_DB_USER}:${_DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
  :`postgres://${_URI_CLOUD}`
:(PostgreSQL_LOCAL==='SI')
  ?`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
  :`postgres://${URI_CLOUD}`

const { Sequelize } = require('sequelize')
const sequelize = new Sequelize( postgresql_uri,{
      logging: false, // set to console.log to see the raw SQL queries
      native: false, // lets Sequelize know we can use pg-native for ~30% more speed
      define : { freezeTableName: true }
      // freezeTableName: true, creará siempre las tablas
      // con el mismo nombre sin crearlas en plural
} );

//The connection
const dbConnection = async() => {
  try {
    await sequelize.authenticate();

    console.log('The connection with PostgreSQL has been successfully established.');
    
    const Dogs = require('./models/Dogs.js');
    await Dogs(sequelize);
    const Temperaments = require('./models/Temperaments.js');
    await Temperaments(sequelize);
    const Temps = require('./models/Temps.js');
    await Temps(sequelize);

    
    /*let last_id
    const { last_idDogs } = require('../fns/fnsApi.js')
    const value_idDog = await last_idDogs(sequelize);
    last_id = value_idDog;
    if (!value_idDog) {
      var URL_REQ = `${EP_BREEDS_TDA}?api_key=${_API_KEY}&order=DESC&limit=1`
      const { last_idBreeds } = require('../fns/fnsApi.js')
      const value_idAPIdog = await last_idBreeds(URL_REQ)
      const { antepongo } = require('../fns/fnsApi.js')
      last_id = antepongo(2,value_idAPIdog)
    }
    console.log(last_id)*/

    //En sequelize.models están todos los modelos importados como propiedades
    // Para relacionarlos hacemos un destructuring
    // const { Dogs } = sequelize.models;
    // Aca vendrian las relaciones
    // Product.hasMany(Reviews);




  } catch (error) {
    console.error('Unable to connect to the database:', error);
  };
};



module.exports = { 
   ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
   objSeq: sequelize, // para importar la conexión así { objSeq } = require('./db.js');
   dbConnection, 
};
