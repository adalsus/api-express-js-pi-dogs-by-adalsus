const { DataTypes } = require('sequelize');


// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
const Dogs = async (sequelize) => {
  
  // defino el modelo
  sequelize.define('Dogs', {
      weight: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      height: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(55),
        allowNull: false,
      },
      life_span: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
      /*id_Temps: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },*/ // Lo comento ya que a lo que haga la relación se creará este campo y será FK
      reference_image_id: {
        type: DataTypes.STRING(55),
      },
      image: {
        type: DataTypes.JSON,
      },
    }, { timestamps: false }
  );
  const { to_sync } = require('../../fns/fnsApi')
  let { optionSYNC } = require('../db.js')
  await to_sync(sequelize.models.Dogs,optionSYNC,"Dogs Model is already coincident!")
};



module.exports = { Dogs };