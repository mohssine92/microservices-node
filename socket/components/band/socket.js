const { io } = require('../../index-socket');

const Bands = require('./models/bands');
const Band = require('./models/band');




module.exports = function (injectedStore) {

    //  esta parte llamada constructor fe la funcion - injeccion del store : stor nos ofrece conexion a db y funcione de interectuar a al misma 
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/remote-mysql');
    }

    //------------------se ejecuta solo cuando se reinicia el servidor de node -------------------//
    const bands = new Bands();
    bands.addBand( new Band( 'Breaking Benjamin' ) );
    bands.addBand( new Band( 'Bon Jovi' ) );
    bands.addBand( new Band( 'Héroes del Silencio' ) );
    bands.addBand( new Band( 'Metallica' ) );


    //---------------------------------------------------------------------------------------------//

   // en Caso de usa db , usamos controller expandir funciones - las funciones del cntroller seran usadas en el 
   // scope de eventos segun necesidada - y eleminamos carpeta models - que usamos con fin de data en memoria 
    const ctrl = require('./controller');
    const Controller = ctrl(store);

   

    io.on('connection', async client => {
        console.log('Cliente conectado');
      

        // emito solo al cliente que se connecte 
        client.emit('active-bands', bands.getBands() );

      

        client.on('disconnect', () => {
          console.log('Cliente desconectado');
        });

        client.on('mensaje', ( payload ) => {
           console.log('Mensaje', payload);
           io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );
        });

        client.on('vote-band', (payload) => {
        
         bands.voteBand( payload.id );
         // emit from to all .. - permite ver cambios reflejados en el emitor mismo 
         io.emit('active-bands', bands.getBands() );
        });

        client.on('add-band', (payload) => {
           const newBand = new Band( payload.name );
           bands.addBand( newBand );
           io.emit('active-bands', bands.getBands() );
        });

        client.on('delete-band', (payload) => {

           bands.deleteBand( payload.id );
           io.emit('active-bands', bands.getBands() );
        });

  
       
    
    });

   


   
}
