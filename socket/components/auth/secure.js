// traer auth global 
const validar = require('./validator');


// exportar una funcion que genera mdlr
module.exports = function checkAuth(action) {

   
    function middleware(req, res, next) {
        switch(action) { 
            case 'login':
                validar.protegerCampos(req.body)
                next();
                break;


            default:
                next();
        }
    }

    return middleware;
}


