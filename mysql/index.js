const express = require('express');
const bodyParser = require('body-parser');

const config = require('../config');
const router = require('./network');
const errors = require('../network/errors');

const app = express();

// tener forma estandar  para comunicar con nuestra api  
app.use(bodyParser.json());

// RUTAS
app.use('/', router)

app.use(errors);

app.listen(config.mysqlService.port, () => {
    console.log('Servicio de [mysql] escuchando en el puerto', config.mysqlService.port);
})






// Microservicio de almacenamiento : asi tenemos la base de datos Separada en un micro servicio totalmente distinto de la api princiapl y del resto de cosas 
// Ventajas : si queremos Tener otars app payton o , c o cualquier otro lenguaje que ataque con la misma db , Imaginar hacer un systema de Machine Learning posiblemente lo hacemos en paython .
// asi podemos connectar a la misma db tanto de node o paython sin reescribir conultas a la db , puesta la consultas forman parte del micro servicio Mysql
// de echo es muy util cuando tenemos la posiblida de no exponer un micro servicio al publico ,  eset debe Tenerlo como  un micro servico privado 
// teniamos db mysql como archivo - lo pasamos a micro servicio - se levanta en un proceso de node  independiente (es definir simplemente una api para poder acceder )