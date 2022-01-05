// aqui vamos a tener toda la parte de la  red de nuestro componenet user 

const express = require('express');

const secure = require('./secure');
const response = require('../../../network/response');

// funcion resuelta - returna objeto con N funciones asyncronas a ejecutar 
const Controller = require('./index');

const router = express.Router();

// Routes
router.get('/', list)
router.post('/follow/:id', secure('follow'),follow);
router.get('/:id/following', following);
router.get('/:id', get);
router.post('/', upsert);
router.put('/', secure('update'), upsert);


// Internal functions - son funciones para comunicar con funciones del controller que nos exporta index - index su trabajo es injectarle a un controller archivo de algun db y exportar funciones del mismo controller .
function list(req, res, next) {
    Controller.list()
        .then((lista) => {
            response.success(req, res, lista, 200);
        })
        .catch(next);
        // como hemos creado un after mdlr para manejar errores globalemnete - asi todos errores que creamos en proceso sabemos que el primero que va mandar es el error 
        // asi vamos a usar la funcion next que viene dentro de todo los --mdlrs de express-- asi los errores no tenemos que gestionarlos dentro la ruta sino que se gestionan automaticamente en el ultimo mdlrs
        // next de donde viene ? - porque router se ejecuta como mdlr en la capa de red de express . y estas funciones pertenecen al router .
    
}

function get(req, res, next) {
    Controller.get(req.params.id)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch(next);
    
}

function upsert(req, res, next) {
    Controller.upsert(req.body)
        .then((user) => {
            response.success(req, res, user, 201);
        })
        .catch(next);
}

function follow(req, res, next) {
    // req.user.id - user es objeto rellenado en el proceso del token - obteniendo informacion del user autenticado el que quiere seguir  en este caso 
    // req.params.id el usuario que queremos seguir
    Controller.follow(req.user.id, req.params.id)
        .then(data => {
            response.success(req, res, data, 201);
        })
        .catch(next);
}

function following(req, res, next) {
    //traer los usuarios que sigua un usuario dado 
	return Controller.following(req.params.id)
		.then( (data) => {
			return response.success(req, res, data, 200);
		})
		.catch(next);
}


module.exports = router;