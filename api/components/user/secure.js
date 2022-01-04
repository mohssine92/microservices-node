// traer auth global 
const auth = require('../../../auth');


// exportar una funcion que genera mdlr
module.exports = function checkAuth(action) {

    // Un mdlr de expres que tiene simplemente req, res , next
    function middleware(req, res, next) {
        switch(action) { // dinamica segun la accion que queremos ejecutar 
            case 'update':
                // id del usuario que quiere modificar - comprobar si el usuario quien genero el tokene es el que quiere modificar 
                const owner = req.body.id;
  
                auth.check.own(req, owner);
                next();
                break;

            default:
                next();
        }
    }

    return middleware;
}










// meter un mdlr de autenticacion dentro de lo que tenemos 
// no permitir pasar a la logica del componenete si no tienes permisos , de esta forma asi si hay falla no llegaras al compoenete lo que es la logica del negocio pura no haya ejecutado y desminuimos el riesgo
// este archivo secure va exportar un mdlr
// este medlr verifica autenticacion con JWT - y autoriza solo al user autenticado que modifique su objeto user 