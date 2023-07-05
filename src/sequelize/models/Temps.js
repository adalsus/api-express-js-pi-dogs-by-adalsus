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
      },
      id_Dogs: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
    }, { timestamps: false }
  );
  try {
    await sequelize.sync({ alter: true })
    .then(
      () => console.log("The model for the Temperament Set is already coincident!")
    )
  } catch(error) {
    console.log(error.message);
  }
};



module.exports = Temps;