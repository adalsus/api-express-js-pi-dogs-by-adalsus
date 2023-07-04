const { DataTypes } = require('sequelize');



// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
const Dogs = (sequelize) => {
  
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
    }, { timestamps: false }
  );
  
  (async () => {
    await sequelize.sync( {alter: true} )
    .then(
      () => console.log("Dogs Model was just (re)created!")
    );
  })();

};



module.exports = Dogs;