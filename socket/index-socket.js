const express = require('express');
const path = require('path');

const config = require('../config');

const chalk = require('chalk')

const errors = require('../network/errors');

// App de Express
const app = express();

// Lectura y parseo del Body
app.use( express.json() );


// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);


// Events 
require('./components/band/events');
require('./components/chat/events');
require('./components/auth/events');
// Routers
const auth = require('./components/auth/network');


const publicPath = path.resolve( __dirname, 'public' );


// Mdlrs Princiapal del proceso 

// Servido en / : logramos servir directorio publico cons sus archivos html , js etc .. :como app html - en la ruta estatica  
app.use( express.static( publicPath ) );
app.use('/api/login', auth );
app.use(errors);


// callback returna err si existe 
server.listen(  config.socket.port, ( err ) => {
    if ( err ) throw new Error(err);
    console.log(`${chalk.red('[Socket] Servidor corriendo en puerto :')}`,config.socket.port);
});


