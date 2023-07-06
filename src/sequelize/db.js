require('dotenv').config();
const { fdeco } = require('../fns/fnsApi.js');

const { DB_USER,DB_PASSWORD,DB_HOST,DB_PORT,DB_NAME,API_KEY,EP_BREEDS_TDA,URI_CLOUD } = process.env;
const _URI_CLOUD = fdeco(JSON.parse(URI_CLOUD))

const eresAdalbertoMonar = "SI"//<-- Cambia sólo aquí a NO en caso de ser otro Programmer 
const PostgreSQL_LOCAL = "NO"

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
const dbConnection = async() => {
  try {
    await sequelize.authenticate();

    console.log('The connection with PostgreSQL has been successfully established.');

    await (require('./models/Dogs.js').Dogs)(sequelize);
    await (require('./models/Temperaments.js').Temperaments)(sequelize);
    await (require('./models/Temps.js').Temps)(sequelize);

    
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
    const { Temps } = sequelize.models;
    const { Dogs } = sequelize.models;
    // Aca vendrian las relaciones
    // Un PK idTemps(Temps) muchos FK id_Temps(Dogs) --> Se usa pareja .hasMany y .belongsTo
    Temps.hasMany(Dogs,{ foreignKey:{name:'id_Temps'} })//Con name le indico que este FK name quiero en Dogs
    Dogs.belongsTo(Temps,{ foreignKey:{name:'id_Temps'} })//Con name le indico que este FK está en Dogs

    //Necesitaré otra relación más, la referencio a continuación
    //Un PK id(Dogs) un FK id_Dogs(Temps) --> Se usa pareja .hasOne y .belongsTo
    Dogs.hasOne(Temps,{ foreignKey:{name:'id_Dogs'} })//Con name le indico que este FK name quiero en Temps
    Temps.belongsTo(Dogs,{ foreignKey:{name:'id_Dogs'} })//Con name le indico que este FK está en Temps
     
    const { to_sync } = require('../fns/fnsApi.js')
    await to_sync(sequelize,{alter:true},"Associations already in place!!!")


  } catch (error) {
    console.error('Unable to connect to the database:', error);
  };
};



module.exports = { 
   ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
   objSeq: sequelize, // para importar la conexión así { objSeq } = require('./db.js');
   dbConnection, 
};
