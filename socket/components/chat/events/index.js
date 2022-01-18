const store = require('../../../../store/mongo-db/mongodb');
const ctrl = require('./socket');


module.exports = ctrl(store);
