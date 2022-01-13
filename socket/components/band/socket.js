const { io } = require('../../index-socket');

// tenemos injectada algun db file o db remota 
// podemos requerir metodos de algun micro servico  como es el caso de micro servicio de user y auth ver ejemplo
// podemos injectar db redis de cache 
// aqui manipulamos todos eventos para band - asi vamos creando componentes de eventos para cada tema dentro del mismo proceso - o podemos crear ortro proceso 



module.exports = function (injectedStore) {

    //  esta parte llamada constructor fe la funcion - injeccion del store : stor nos ofrece conexion a db y funcione de interectuar a al misma 
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/remote-mysql');
    }

 

    io.on('connection', client => {
        console.log('Cliente conectado');
    
        client.on('disconnect', () => {
            console.log('Cliente desconectado');
        });
    
        client.on('mensaje', ( payload ) => {
            console.log('Mensaje', payload);
    
            io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );
    
        });
    
    
    });

   


   
}
