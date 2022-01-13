const store = require('../../../store/remote-mysql');
const ctrl = require('./socket');


module.exports = ctrl(store);
