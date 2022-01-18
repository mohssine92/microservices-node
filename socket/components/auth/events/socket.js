const { io } = require('../../../index-socket');

const chalk = require('chalk')


module.exports = function (injectedStore) {

    //  esta parte llamada constructor fe la funcion - injeccion del store : stor nos ofrece conexion a db y funcione de interectuar a al misma 
    let store = injectedStore;
    if (!store) {
        store = require('../../../../store/mongo-db/mongodb');
    }


    io.on('connection', async client => {
      
        console.log( ' Cliente conectado',`${chalk.blackBright('[Events-auth]')}`);
      


        client.on('disconnect', () => {
          console.log('Cliente desconectado');
        });

     

  
       
    
    });

   


   
}
