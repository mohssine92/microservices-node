// const store = require('../../../store/dummy'); db de memoria 

const store = require('../../../store/mongo-db/mongodb');
const ctrl = require('./controller');

module.exports = ctrl(store);












// auth de autorizacion - nuestra entidad de autenticacion 
// la password se puede guardar en entida usuario pero no es buen practica para varias razones como evitar campos sensibles etc .. autenticacion sera entidad separada de usuario y relacionada internamenet