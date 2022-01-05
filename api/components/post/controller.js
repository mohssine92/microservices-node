const TABLA = 'post';

module.exports = function (injectedStore) {

    //  esta parte llamada constructor fe la funcion - injeccion del store : stor nos ofrece conexion a db y funcione de interectuar a al misma 
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/mysql');
    }

    function list() {
        return store.list(TABLA);
    }

    return {
        list,
    };
}


// Metodologia 
// esta funcion exportada se ejecuta en el index , y el index la exporta al networl , como fue ejecutada en index , network accede a su returno y ejecta cierta funcion asyncrona que debe resolver algo .  