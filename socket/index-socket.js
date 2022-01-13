const express = require('express');
const path = require('path');

const config = require('../config');


// App de Express
const app = express();

// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./components/band');


const publicPath = path.resolve( __dirname, 'public' );



// Servido en / : logramos servir directorio publico cons sus archivos html , js etc .. :como app html - en la ruta estatica  
app.use( express.static( publicPath ) );




// callback returna err si existe 
server.listen(  config.socket.port, ( err ) => {

    if ( err ) throw new Error(err);

    console.log('[socket]Servidor corriendo en puerto', config.socket.port);

});


// console.log(io);
// module.exports = {
//     io 
// };


