const express = require('express');
const bodyParser = require('body-parser');

const config = require('../config');
const router = require('./network');
const errors = require('../network/errors');

const app = express();

app.use(bodyParser.json());

// RUTAS
app.use('/', router)
app.use(errors);


app.listen(config.cacheService.port, () => {
    console.log('Servicio de caché redis escuchando en el puerto', config.cacheService.port);
})