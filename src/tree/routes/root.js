require('dotenv').config()
const endpoint = require('express').Router();
const { PORT } = process.env;


endpoint.get("/", (req, res) => {
   res.send(`Your app is listening on port ${PORT}<br>`+
            'The connection with PostgreSQL has been successfully established.<br>'+
            'Dogs Model is already coincident!<br>'+
            'Temperaments Model is already coincident!<br>'+
            'The model for the Temperament Set is already coincident!<br>'+
            'Associations already in place!!!<br>'+
            '<br><br>'+
            'PETICIONES O ENLACES DISPONIBLES QUE PUEDE USAR:<br>'+
            '/  --Es justo en el que está ahorita, está en la raiz de la API<br>'+
            '/dogs  --Añadiendo solo esto al final de la dirección web, responderá con todas las razas.json almacenadas en la base de datos<br>'+
            '/dogs?name=toy  --Añadiendo solo esto al final de la dirección web, responderá con la(s) raza(s).json que en su name(nombre) tenga(n) toy<br>'+
            '/dogs/100  --Añadiendo solo esto al final de la dirección web, responderá con la raza.json cuyo id(código identificador) sea el 100<br>'+
            '/temperaments  --Añadiendo solo esto al final de la dirección web, responderá con todos los temperaments.json(temperamentos) recopilados.');
});



module.exports = endpoint;