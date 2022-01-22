
const chalk = require('chalk');

let grabarMensaje;


module.exports = function (client , io , store) {

   
    console.log( ' Cliente conectado',`${chalk.yellow('[Events-chat]')}`);

    const { Mensaje } = store;
   
    // privateCliente -> server -> clientPrivate 
    client.on('mensaje-personal', async( payload ) => {
      
        console.log(payload);
        //io.emit('mensaje-personal', payload)

        await grabarMensaje(payload)
        io.to(payload.para).emit('mensaje-personal', payload)
      
    })


    grabarMensaje = async( payload ) => {
    
        try {
            const mensaje = new Mensaje( payload );
            await mensaje.save();
    
            return true;
        } catch (error) {
            return false;
        }
    
    }

   
}

module.exports = {
    grabarMensaje,

}