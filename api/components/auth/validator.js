const error = require('../../../utils/error');

function protegerCampos(body) {

      // esta validacion por fin de no tener error de prop undefined , en caso del clienet manda props no requeridas 
      if( !body.username || !body.password){
        throw error('campos Insertados Incorrectos', 400);
    
      }

   
   
}

module.exports = {
    protegerCampos,
   
};