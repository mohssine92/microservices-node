// creacion de cliente node para connectar a db mongodb
const mongoose = require('mongoose');

const config = require('../../config');

 // Function para connectar a mongodb atlass 
const dbConnection = async() => {

    try {
       await mongoose.connect( config.mongodb.db_cnn , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

     
        console.log('DB Online');
        

    } catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos - Hable con el admin');
    }

}

dbConnection();


//---------------------Models Mongoose---------------------------------------------//

const User = require('./models/usuario');
const Mensaje = require('./models/mensaje')

// Exportarlos a Controllers com objetos de monggose
module.exports = {
    User,
    Mensaje
};