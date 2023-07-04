require('dotenv').config();
const { fdeco } = require('../fns/fnsApi.js');

const { DB_USER,DB_PASSWORD,DB_HOST,DB_PORT,DB_NAME,EP_BREEDS_TDA } = process.env;
const soyAdalbertoMonar = "SI" 
const postgresql_uri = ( soyAdalbertoMonar==='SI' )
?`postgres://${fdeco(JSON.parse(DB_USER))}:${fdeco(JSON.parse(DB_PASSWORD))}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
:`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`

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
    Dogs(sequelize);
    
    
    const { last_idDogs } = require('../fns/fnsApi.js')
    const value_idDog = await last_idDogs(sequelize);
    console.log(value_idDog);
    
    const { last_idBreeds } = require('../fns/fnsApi.js')
    const value_idAPIdog = await last_idBreeds(URL_BASE);

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
