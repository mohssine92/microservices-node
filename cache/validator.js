const error = require('../utils/error');
const jwt = require('jsonwebtoken');
const config = require('../config.js');
const chalk = require('chalk')


function validarToken (req){

  
  const token = req.header('apiToken');
  
 
   if ( !token ) {   
     
      throw error('No hay token en la petición', 400);
  }

  try {
    // console.log('...',  config.sercret);
     
    const payload = jwt.verify( token, config.sercret); // console.log(uid);
   
    console.log(`${chalk.bgCyan('[mysql/validator.js-58]')}`,payload);

     //req.user = payload;

    
    
  } catch (err) {
     

      throw error('Token no válido', 401);
   }


}




module.exports = {
    validarToken
};