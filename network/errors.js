const response = require('./response');
const chalk = require('chalk')

function errors(err, req, res, next) {
  
     console.error(`${chalk.red('[error]:')}`, err);
   
    //console.log(`${chalk.red('[error]:')}`)

    const message = err.message || 'Error interno';
    const status = err.statusCode || 500;

    // simplemente una funcion para dar forma a respuesta de al api 
    response.error(req, res, message, status);

}

module.exports = errors;










// Gestión avanzada de errores: Throw 13/29 - es mdlr diferencia a otros mdlrs recibe primer arg de err - podemos considerar manejador de errores global 
// gestionar Todos  los errores del mismo archivo 
// no es buen idea que se ve path de nuestro err - lo puede aprovechar un atacante .
// asi en la consola podemos ver toda la informacion sobre el errr pero modificamos output en la red del err occultamos mas detalles - no dejar oportunidad al hacker obtener mas info sobre systema de path 
// esta funcion se ejecuta en mdlr de express .asi recibe err, req, res , next 