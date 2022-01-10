//const chalk = require('chalk');
const redis = require('redis');

const config = require('../../config');


// crear primer cliente para connectar con redis
const client = redis.createClient({
    host: config.redis.host,
    port: config.redis.port,
    password: config.redis.password,
});


//-----------Metodos redis
function list(table) {


    return new Promise((resolve, reject) => {

      
        // llamada a funcion get de redis : lectura de db redis - funcciones de redis funciona con callback como tal .
        // Redis principalmente es db clave:valor - vamos a guardar valor como se fuese un string largo - asi convertir los strings a objetos cuando leamos la db 
        client.get(table, (err, data) => {
           
            if (err) return reject(err);

            let res = data || null;
           
            if (data) {
               // res = JSON.stringify(data);
                res = JSON.parse(data)
            }
            resolve(res);
        });
    });
}

function get(table, id) {
    //
}

async function upsert(table, data) {

    // Redis es db funcion a con llave valor , valor lo guardamos strinify 
    let key = table;
    if (data && data.id) {
        //  simplemente si viene id actualizamos la llave 
        key = key + '_' + data.id;
    
    }
   
    client.setex(key, 20, JSON.stringify(data)); // 2arg experetion 20s = tiempo de persistencia . luego se desparece de la db - expiracion de cache  
    return true;
}

module.exports = {
    list,
    get,
    upsert,
};