const jwt = require('jsonwebtoken');
const config = require('../config');
// funcion recibe mensaje de err y codigo del err 
const error = require('../utils/error');

const secret = config.jwt.secret;

function sign(data) {
   
    // funcion para firmar JWT
    return jwt.sign(data, secret );
}

function verify(token) {
    return jwt.verify(token, secret)
}

// const va ser objeto que va tener valores funciones 
const check = {
    own: function(req, owner) {
        const decoded = decodeHeader(req);
       
        //owner es id del objeto user impacta actualizacion - decode.id es id viajado en token de autenticacion - con fin cada autenticacion modifica su objeto nada mas  en este caso 
        if (decoded.id !== owner) {
           
            throw error('No puedes hacer esto', 401);
        }
    },
    logged: function(req) { 
        // extraer la data del token en objeto - informacion del user autenticado el que quiere seguir 
        const decoded = decodeHeader(req);
    },
}

function getToken(auth) {
    if (!auth) {
        throw error('No viene token', 401);
    }
    
    // es decir tal string no lo ha encontrado  en la cadena returna -1 
    if (auth.indexOf('Bearer ') === -1) {
        throw error('Formato invalido', 401);
    }

    // devolver token en plano
    let token = auth.replace('Bearer ', '');
    return token;
}

// funcion para decodificar el token
function decodeHeader(req) {
    const authorization = req.headers.authorization || '';
   
    // tener token plano
    const token = getToken(authorization);
    // verificar la firma del token - si exita lo decodifica a objeto
    const decoded = verify(token);

    // con fin de extraer data del user autenticado en el controller como es caso del user el que quieres seguir
    req.user = decoded;

    return decoded;
}


module.exports = {
    sign,
    check
};