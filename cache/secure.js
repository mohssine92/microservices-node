// traer auth global 
const validar = require('./validator');


// exportar una funcion que genera mdlr
module.exports = function checkAuth(action) {

    // Un mdlr de expres que tiene simplemente req, res , next
    function middleware(req, res, next) {
        switch(action) { // dinamica segun la accion que queremos ejecutar 
        
            case 'token':
                validar.validarToken(req)
                next();
                break;

            default:
                next();
        }
    }

    return middleware;
}


