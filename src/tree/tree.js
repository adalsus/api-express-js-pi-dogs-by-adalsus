var cors = require('cors')
const root = require('./routes/root.js')
const dogs = require('./routes/dogs.js')
const temperaments = require('./routes/temperaments.js')
const temps = require('./routes/temps.js')

const tree = app => {
   
   app.use(cors())
   app.use('/', root)
   app.use('/dogs', dogs)
   app.use('/temperaments', temperaments)
   app.use('/temps', temps)

   app.get('/kill', (req, res) => {
      require('../fns/fnsApi.js').removeFile('./src/var/dataGt_g.json')
      let exito = {'exito': 'JSON dataGt_g removido o verificado con éxito'}
      res.json(exito)
   })
   app.get('*', (req, res) => {
      //require('../fns/fnsApi.js').removeFile('./src/var/dataGt_g.json')
      let fallo = {'error': 'Ruta inválida'}
      res.json(fallo)
   })
   
};

module.exports = tree;
