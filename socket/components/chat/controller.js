
const error = require('../../../utils/error');
const chalk = require('chalk');



module.exports = function (injectedStore) {

   
    let store = injectedStore;

   
    if (!store) {
        store = require('../../../store/mongo-db/mongodb');
    }

    // Desestructuracion de Objetos Models de Mongoose de diferentes Tablas 
    const { Mensaje } = store;
   
    const obtenerChat = async(req, res) => {

        // steado en proceso Token 
       const miId = req.uid;
   
       // quien la persona quiero leer mensajes como set yo JWT 
       const mensajesDe = req.params.de;
     
   
       const last30 = await Mensaje.find({
           $or: [{ de: miId, para: mensajesDe }, { de: mensajesDe, para: miId } ]
       })
       .sort({ createdAt: 'desc' })
       .limit(30);
   
     

       return {
          ok: true,
          mensajes: last30

       }
   
   }
   


    return {
        obtenerChat
    };
 
};


// dentro del controller del compoenete donde tomamos la decicion que tabla usamos , puesto que store nos exporta funciones genericas abiertas  a tablas segun le injectamos  