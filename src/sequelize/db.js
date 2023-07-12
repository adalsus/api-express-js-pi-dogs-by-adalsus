require('dotenv').config();
const { fdeco } = require('../fns/fnsApi.js');

const { DB_USER,DB_PASSWORD,DB_HOST,DB_PORT,DB_NAME,API_KEY,EP_BREEDS_TDA,URI_CLOUD } = process.env;
const _URI_CLOUD = fdeco(JSON.parse(URI_CLOUD))



const eresAdalbertoMonar = "SI"//<-- Cambiar sólo aquí a NO en caso de ser otro Programmer 
const PostgreSQL_LOCAL = "NO"
const reiniciarLasAsociaciones = 'NO'//<-- Cambiar a SI, si desea perder las Asociaciones ya creadas



let _DB_USER,_DB_PASSWORD,_API_KEY
if (eresAdalbertoMonar==='SI' && PostgreSQL_LOCAL==='SI') {
  _DB_USER = fdeco(JSON.parse(DB_USER))
  _DB_PASSWORD = fdeco(JSON.parse(DB_PASSWORD))
  _API_KEY = fdeco(JSON.parse(API_KEY))
}

const postgresql_uri = (eresAdalbertoMonar==='SI')
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
let optionSYNC = (reiniciarLasAsociaciones === 'SI') ? {alter:true} : null
const dbConnection = async() => {
  try {
    await sequelize.authenticate();

    console.log('The connection with PostgreSQL has been successfully established.');

    await (require('./models/Dogs.js').Dogs)(sequelize);
    await (require('./models/Temperaments.js').Temperaments)(sequelize,optionSYNC,'coincident');
    await (require('./models/Temps.js').Temps)(sequelize);
    
    // En sequelize.models están todos los modelos importados como propiedades
    // Para relacionarlos hacemos un destructuring
    const { Temps } = sequelize.models;
    const { Dogs } = sequelize.models;
    // Aca vendrian las relaciones
    // Un PK idTemps(Temps) muchos FK id_Temps(Dogs) --> Se usa pareja .hasMany y .belongsTo
    Temps.hasMany(Dogs,{ foreignKey:{name:'id_Temps'} })//Con name le indico que este FK name quiero en Dogs
    Dogs.belongsTo(Temps,{ foreignKey:{name:'id_Temps'} })//Con name le indico que este FK está en Dogs
    const { to_sync } = require('../fns/fnsApi.js')
    await to_sync(sequelize,optionSYNC,"Associations already in place!!!")

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  };
};



module.exports = { 
   ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
   objSeq: sequelize, // para importar la conexión así { objSeq } = require('./db.js');
   dbConnection,
   optionSYNC,
   _API_KEY,
};
