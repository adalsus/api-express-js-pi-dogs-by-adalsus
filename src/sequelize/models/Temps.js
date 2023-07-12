const { DataTypes } = require('sequelize');


// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
const Temps = async (sequelize) => {
  
  // defino el modelo
  sequelize.define('Temps', {
      idTemps: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      namesTemps: {
        type: DataTypes.STRING(200),
        allowNull: false,
      }
    }, { timestamps: false }
  );
  const { to_sync } = require('../../fns/fnsApi')
  let { optionSYNC } = require('../db.js')
  await to_sync(sequelize.models.Temps,optionSYNC,"The model for the Temperament Set is already coincident!")
};



module.exports = { Temps };