const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const chalk = require('chalk');
const config = require('../../../config');

const error = require('../../../utils/error');



//  mdlr - personalizado : Accumulador de errors de check funcion del paquete express-validator
const validarCampos = (req, res, next ) => {

  const errores = validationResult( req );


  if( !errores.isEmpty() ) {
    console.error(`${chalk.red('[error-validarCampos]:')}`, errores);
      return res.status(400).json({
          error: true,
          errors: errores.mapped()
      });

      
  }
  // es decirl las funciones check de validacion estan llamando next inetrnamente sino no llegamos a ejecuat en cascada la secuencia ...
  next();
}

const generarJWT = ( uid ) => {
 
  // aqui vemos concepto de transformar una funcion que returna callback - a una promessa - que - nos permita implementar asyn , await en resolucion   

  return new Promise( (resolve, reject) => {

      const payload = { uid };

      jwt.sign( payload,  config.socket.JWT, {
          expiresIn: '24h'
      }, ( err, token ) => {

          if ( err ) {
              // no se pudo crear el token
              reject('No se pudo generar el JWT');

          } else {
              // TOKEN!
              resolve( token );
          }

      })

  });


}

const validarJWT = ( req, res, next ) => {

    // Leer token
    const token = req.header('x-token');

    if ( !token ) {
        
        throw error('No hay token en la petición', 400);
    }

    try {

        const { uid } = jwt.verify( token,  config.socket.JWT );
        req.uid = uid;
        
        next();

    } catch (err) {

          console.error(`${chalk.cyan('[Validator-error]:')}`, err)
          throw error('Token no válido',401)
    }




}




module.exports = {
    
    validarCampos,
    generarJWT,
    validarJWT
  
};