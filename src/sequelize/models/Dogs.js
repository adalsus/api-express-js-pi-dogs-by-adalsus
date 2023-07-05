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
      id_Temps: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reference_image_id: {
        type: DataTypes.STRING(55),
      },
      image: {
        type: DataTypes.JSON,
      },
    }, { timestamps: false }
  );
  try {
    await sequelize.sync({ alter: true })
    .then(
      () => console.log("Dogs Model is already coincident!")
    )
  } catch(error) {
    console.log(error.message);
  }
};



module.exports = Dogs;