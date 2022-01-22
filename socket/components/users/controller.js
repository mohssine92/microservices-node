

module.exports = function (injectedStore) {

    // comprobar el stor que tiene que ser en caso que no usamos el store que queramos - ventajas de trabajar archivo db como injeccion del controller
    let store = injectedStore;

   
    if (!store) {
        store = require('../../../store/mongo-db/mongodb');
    }

    // Desestructuracion de Objetos Models de Mongoose de diferentes Tablas 
    const { User } = store;

    const getUsuarios = async (req) => {  
    
         // console.log(req.query); http://192.168.1.58:3004/api/usuarios?desde=2
          const desde = Number( req.query.desde ) || 0; // paginacion

          const usuarios = await User
             .find({ _id: { $ne: req.uid } } ) // entre llaves pasamos condicion consulta : $ne: negacion uid token - no quiero mo objeto en la lista de connectados no puede chatear conmigo mismo 
             .sort('-online') // online es bool : - : ordene true primero , online : false primero 
             .skip(desde)  // paginacion
             .limit(20) // paginacion 
         

            return usuarios
    }

 


    return {
        getUsuarios
    }

}
