const store = require('../../../store/mysql');
const ctrl = require('./controller');

module.exports = ctrl(store);


// Metodologia : index obtiene file de db lo injecta al controller funcion , asi ejecuta la funcion controller y la exporta para uso en network file 