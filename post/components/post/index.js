// fijate que el microservicio post sigue usando la db bebida y no la remota , aunque pude usar la remota perfectamente  - sigue usando al bebida para hacerlo totalmente horizontal 
const store = require('../../../store/remote-mysql');
const ctrl = require('./controller');

module.exports = ctrl(store);


// Metodologia : index obtiene file de db lo injecta al controller funcion , asi ejecuta la funcion controller y la exporta para uso en network file 