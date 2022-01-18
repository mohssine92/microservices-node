const { Schema, model } = require('mongoose');

const UserSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    online: {
        type: Boolean,
        default: false
    },

});

// Sobre Escribir Methodo 
// esta Parte es donde protegemos las prop de la entidada que no pretendemos devolver eb response al cliente 
// funcion tradicional - no usamos funcion de flecha porque no modifica el valor al que apunta this
UserSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
})



module.exports = model('Usuario', UserSchema );