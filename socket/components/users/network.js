const express = require('express');

const {  validarJWT } = require('./validator');

//const response = require('../../../network/response');
const Controller = require('./index');



const router = express.Router();

// path: api/usuarios



// Usado como barrera de validacion de token - segun responda tomamaos decision en pantalla de Front-end dejar paginar o rederigir a loguear 
router.get('/', validarJWT, getUsuarios);


function getUsuarios(req, res, next) {
    Controller.getUsuarios(req)
        .then((usuarios) => {
            // Forma 1 de responder
            //response.success(req, res, lista, 200);

            // Forma 2 de responder - compatible curso de fluter avanzado seccion10
            res.json({
                ok: true,
                usuarios,
            })
        })
        .catch(next);
}



module.exports = router;