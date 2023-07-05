const { DataTypes } = require('sequelize');


// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
const Temperaments = async (sequelize) => {
  
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
  try {
    await sequelize.sync({ alter: true })
    .then(
      () => console.log("Temperaments Model is already coincident!")
    )
  } catch(error) {
    console.log(error.message);
  }
};



module.exports = Temperaments;