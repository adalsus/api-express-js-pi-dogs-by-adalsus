const { DataTypes } = require('sequelize');


// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
const Temperaments = async (sequelize,optionSYNC,messcompl) => {
  
  // defino el modelo
  sequelize.define('Temperaments', {
      idT: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      nameT: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
    }, { timestamps: false }
  );
  const { to_sync } = require('../../fns/fnsApi')
  //let { optionSYNC } = require('../db.js')
  await to_sync(sequelize.models.Temperaments,optionSYNC,`Temperaments Model is already ${messcompl}!`)
};



module.exports = { Temperaments };