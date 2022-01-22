const express = require('express');

// check es un mdlr lo cual puede verificar campo por campo 
const { check } = require('express-validator');
const { validarCampos, validarJWT } = require('./validator');

const response = require('../../../network/response');
const Controller = require('./index');



const router = express.Router();

// api/mensajes/:de



// Usado como barrera de validacion de token - segun responda tomamaos decision en pantalla de Front-end dejar paginar o rederigir a loguear 
router.get('/:de', validarJWT, obtenerChat);


function obtenerChat(req, res, next) {
    Controller.obtenerChat(req)
        .then((messages) => {
            // Forma 1 de responder
            //response.success(req, res, lista, 200);

            // Forma 2 de responder - compatible curso de fluter avanzado seccion10
            const { ok , mensajes } = messages 
            res.json({
                ok,
                mensajes,
              
            });
        })
        .catch(next);
}






module.exports = router;