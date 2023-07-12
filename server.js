// init project
require('dotenv').config()
const server = require('./app.js')
const PORT = process.env.PORT || 3001
const { dbConnection } = require('./src/sequelize/db.js');

//Conectar con la db postgresql
dbConnection();

//listen for requests :)
const listener = server.listen(PORT, function(error) {
  if (!error) { 
    //require('./src/fns/fnsApi.js').removeFile('./src/var/dataGt_g.json')
    console.log("Your app is listening on port " + listener.address().port);
  }
  else { console.log(error.message) }
});
