const response = require('./response');

function errors(err, req, res, next) {
    
    console.error('[error]', err);

    const message = err.message || 'Error interno';
    const status = err.statusCode || 500;

    response.error(req, res, message, status);

}

module.exports = errors;










// Gestión avanzada de errores: Throw 13/29 - es mdlr diferencia a otros mdlrs recibe primer arg de err - podemos considerar manejador de errores global 
// gestionar Todos  los errores del mismo archivo 
// no es buen idea que se ve path de nuestro err - lo puede aprovechar un atacante .
// asi en la consola podemos ver toda la informacion sobre el errr pero modificamos output en la red del err occultamos mas detalles - no dejar oportunidad al hacker obtener mas info sobre systema de path 