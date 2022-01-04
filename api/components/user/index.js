
// va ser la db que queremos setear a nuestro controlador
// const store = require('../../../store/dummy');  --db  false
const store = require('../../../store/mysql');
const ctrl = require('./controller');

// ctrl : es objeto --> strl() : convertido en una funcion  / asi archivo de controller debe exportar funcion  - le injectamos lo que queremos injectar en este caso sera store
module.exports = ctrl(store);











// controlador que esta accediendo a la parte de datos no requiera que automaticamenta una x db sea su db , muy util para parte de Testing connect to db teste o diferent db 
// lo hacemos de esta manera , este archivo exporta todos nuestros controller y le injectamos db 