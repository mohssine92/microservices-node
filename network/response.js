// lo que nos interesa tener todas respuestas desde el mismo archivo 


// exportar dos funciones success y error - formatear la respuesta en json 

exports.success = function (req, res, message, status) {
    let statusCode = status || 200;
    let statusMessage = message || '';

    res.status(statusCode).send({
        error: false,
        status: status,
        body: statusMessage,
    });
}

exports.error = function (req, res, message, status) {
    let statusCode = status || 500;
    let statusMessage = message || 'Internal server error';

    res.status(statusCode).send({
        error: true,
        status: status,
        body: statusMessage,
    });
}