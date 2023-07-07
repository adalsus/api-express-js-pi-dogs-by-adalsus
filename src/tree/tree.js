const root = require('./routes/root.js')
const dogs = require('./routes/dogs.js')
const temperaments = require('./routes/temperaments.js')

const tree = app => {
   
   app.use('/', root)
   app.use('/dogs', dogs)
   app.use('/temperaments', temperaments)

   app.get('*', (req, res) => {
      let fallo = {
          'error': 'Ruta inválida'
      }
      res.json(fallo)
   })
   
};

module.exports = tree;
