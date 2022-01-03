const express = require('express');
const bodyParser = require('body-parser');

// incluir docs de la api dentro del systema de rutas de la api como ducumentacion a los clientes de nuestra api - video 6
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');

const config = require('../config.js');
const user = require('./components/user/network');
const auth = require('./components/auth/network');
const errors = require('../network/errors');

const app = express();

app.use(bodyParser.json());

// ROUER
app.use('/api/user', user);
app.use('/api/auth', auth );
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(errors);





app.listen(config.api.port, () => {
    console.log('Api escuchando en el puerto ', config.api.port);
});