const express = require('express');

// check es un mdlr lo cual puede verificar campo por campo 
const { check } = require('express-validator');
const { validarCampos, validarJWT } = require('./validator');

const response = require('../../../network/response');
const Controller = require('./index');



const router = express.Router();

// api/login/


router.post('/', [
    check('password','La contraseña es obligatoria').not().isEmpty(),
    check('email','El correo es obligatorio').isEmail(),
    validarCampos
],login);

// primer arg del chech sob campos que vienen en el body del post
router.post('/new',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','La contraseña es obligatoria').not().isEmpty(), // ver docs mas validacion  - lenght min , max - expresion regular etc ..
    check('email','El correo es obligatorio').isEmail(),
    validarCampos // accumula errores de check - no de secure
],crearUsuario );

// Usado como barrera de validacion de token - segun responda tomamaos decision en pantalla de Front-end dejar paginar o rederigir a loguear 
router.get('/renew', validarJWT, renewToken);


function login(req, res, next) {
    Controller.logear(req)
        .then((lista) => {
            response.success(req, res, lista, 200);
        })
        .catch(next);
}

function crearUsuario(req, res, next) {
    Controller.CrearUsuario(req)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch(next);
       
} 

function renewToken(req, res, next) {
    Controller.renewToken(req)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch(next);     
} 


module.exports = router;