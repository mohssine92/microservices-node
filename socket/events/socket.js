const { io } = require('../index-socket');


const { comprobarJWT } = require('../components/auth/validator');


const authEvent = require('../components/auth/events')
const chatEvent = require('../components/chat/events')

module.exports = function (injectedStore) {

    //  esta parte llamada constructor fe la funcion - injeccion del store : stor nos ofrece conexion a db y funcione de interectuar a al misma 
    let store = injectedStore;
    if (!store) {
        store = require('../../store/mongo-db/mongodb');
    }
   

    // Desestructuracion de Objetos Models de Mongoose de diferentes Tablas 
    const { User } = store;

    io.on('connection', async client => {
     
        // Verificar autenticación del cliente connectado por socket 
        const [ valido, uid ] = comprobarJWT( client.handshake.headers['x-token'] )
        if ( !valido ) {
            return client.disconnect(); }
    
        // Cliente autenticado - Update en db ref
        usuarioConectado( uid );
        
       

        // Unir cliente a una sala que tiene nombre mismo uid mongo del user autentucado
        // Sirve para crear salas de chat compuesta por varios clientes tambien
        client.join( uid ); 



   
        authEvent(client, io , store)
        chatEvent(client, io , store)





        client.on('disconnect', async () => {
           usuarioDesconectado(uid);
        });

     
    
    });


    const usuarioConectado = async ( uid = '' ) => {

        const usuario  = await User.findById( uid );
        usuario.online = true;
        await usuario.save();
        return usuario;
    }

    const usuarioDesconectado = async ( uid = '' ) => {
        const usuario  = await User.findById( uid );
        usuario.online = false;
        await usuario.save();
        return usuario;
    }


 

   
   
}



