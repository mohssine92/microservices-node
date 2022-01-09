const express = require('express');
const bodyParser = require('body-parser');

const config = require('../config.js');
const post = require('./components/post/network');
const errors = require('../network/errors');

const app = express();

app.use(bodyParser.json());

// ROUTER
app.use('/api/post', post);

app.use(errors);

app.listen(config.post.port, () => {
    console.log('Servicio [posts] escuchando en el puerto ', config.post.port);
});







// post estaba como componente de de la api - como nuestro api = es un proceso de node - nuesros compoenetes van creciendo hemmos tomado la decicon de extraer componente post 
// como micro servicio post. es otro proceso de node independiente
