const chalk = require('chalk')
const express = require('express');

// Formatear la salida : la respuesta de la api 
const response = require('../network/response');
// Archivo de configuracion a db Mysql - connexion mas consulats 
const Store = require('../store/mysql');

const router = express.Router();

const secure = require('./secure');
//const { validarJWT } = require('./validar-jwt');



//--------------------------------Rutas Api db Mysql 
  // Tener esto asi nos permita todas las peticiones que hagamos vaya hacer peticion directa contra la base de datos 



router.get('/:table' ,secure('token') , list);  // simepre ultimo en orden si usamos segemntos explicitos 
router.get('/:table/:id',secure('token'), get); // params => :table :id
router.get('/',secure('token'), follow); 


// si usamos mismo verbo http - y usamos parametro como :table , y tenemos segmentos explicitos como /query , debe ser ejecutados antes que :table 
// asi cuando mandamos peticiones desde clientes autorizados con segmentos explicitos van a ejecutarse antes que /:table que lo va considerar como tabla sql
router.post('/query' , secure('token') , search);  // segmento explicito 
router.post('/following' , secure('token'),following); // segmento explicito 
router.post('/:table', secure('token') ,insert);  // siempre el ultimo en orden si usamos segmentos explicitos 

router.post('/:table', secure('token') ,insert); 
router.put('/:table',secure('token'), upsert);
//--------------------------------------Funciones 

async function list(req, res, next) {
    const datos = await Store.list(req.params.table)
    response.success(req, res, datos, 200);
}

async function follow (req, res, next) {

   const datos = await Store.queryAND(req.query) 
   response.success(req, res, datos, 200);
  
}

async function get(req, res, next) {
    const datos = await Store.get(req.params.table, req.params.id)
    response.success(req, res, datos, 200);
}

async function insert(req, res, next) {
 
    const datos = await Store.insert(req.params.table, req.body)
    response.success(req, res, datos, 200);
}

async function upsert(req, res, next) {
    const datos = await Store.upsert(req.params.table, req.body)
    response.success(req, res, datos, 200); 
}

async function search (req, res, next){
  
    console.log(`${chalk.bgCyan('[mysql/network.js- F:search]')}`,req.body);
    const datos = await Store.query(req.body.table, req.body.q)
    response.success(req, res, datos, 200); 
}

async function following(req, res, next){

  const datos = await Store.query(req.body.table, req.body.query, req.body.join);
  response.success(req, res, datos, 200); 
   
}





module.exports = router;

