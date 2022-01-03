// aqui vamos a tener toda la parte de la  red de nuestro componenet user 

const express = require('express');

const secure = require('./secure');
const response = require('../../../network/response');

// funcion resuelta - returna objeto con N funciones asyncronas a ejecutar 
const Controller = require('./index');

const router = express.Router();

// Routes
router.get('/', list)
router.get('/:id', get);
router.post('/', upsert);
router.put('/', secure('update'), upsert);

// Internal functions - son funciones para comunicar con funciones del controller que nos exporta index - index su trabajo es injectarle a un controller archivo de algun db y exportar funciones del mismo controller .
function list(req, res) {
    Controller.list()
        .then((lista) => {
            response.success(req, res, lista, 200);
        })
        .catch((err) => {
            response.error(req, res, err.message, 500);
        });
    
}

function get(req, res) {
    Controller.get(req.params.id)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch((err) => {
            response.error(req, res, err.message, 500);
        });
    
}

function upsert(req, res) {
    Controller.upsert(req.body)
        .then((user) => {
            response.success(req, res, user, 201);
        })
        .catch((err) => {
            response.error(req, res, err.message, 500);
        });
    
}


module.exports = router;