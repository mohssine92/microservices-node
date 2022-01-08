const remote = require('./remote');
const config = require('../config');

// TODO: invistigar cuando una Funcion lleva new como una instancia de clase 
module.exports = new remote(config.mysqlService.host, config.mysqlService.port);







// este archivo el que toma la decicion , la decicion de este archivo es decir al archivo remote que la peticion de tal componenets le vas a hacer a al api de Mysql 
// Sabemos que el archivo remote esta preparado para hacer peticiones a apis de dbs  