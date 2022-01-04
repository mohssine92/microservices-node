
// creacion de err personalizado -instanciar objeto de err de js y rellenarlo 
function err(message, code) {
    let e = new Error(message);

    if (code) {
        e.statusCode = code;
    }

    return e;
}

module.exports = err;





// crear todas las utulidades que no pertenecen a ninguna sino al proyecto en general 
// de esta manera nuestra app no solamente va responder con mensaje de err sino con el codigo del err 
