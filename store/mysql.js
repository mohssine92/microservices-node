const mysql = require('mysql');

const config = require('../config');

const dbconf = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
};


//--------------------Funcion para connectar db gestionada por el motor Mysql 

let connection;


function handleCon() {
    connection = mysql.createConnection(dbconf);

    connection.connect((err) => {
        if (err) {
            console.error('[db err]', err);
            // paraque si haya cualquier prob de conexion que lo vuelva a intentar despues de 2s
            setTimeout(handleCon, 2000);
        } else {
            console.log('DB Connected - MySql !');
        }
    });

    connection.on('error', err => {
        console.error('[db err]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            // este tipo de err si se ha perdido la conexion , entonces , vuelva a intentarlo a connectar 
            handleCon();
        } else {
            throw err;
        }
    })
}

// funcion que maneja la conexion a db Mysql
handleCon();



//----------------Funciones para comunicar con shema db y tablas ---------------

function list(table) {
    return new Promise( (resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

function get(table, id) {

       return new Promise((resolve, reject) => {
        //(El id buscado debe ir entre comillas ‘id’) si id campo en db es varchar como en este caso 
        connection.query(`SELECT * FROM ${table} WHERE id='${id}' `, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

function insert(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

function update(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

async function upsert(table, data) {
      
    // verificar si existe registro con tal id - si viene id en caso de follow no no tenemos id en la tabla
    let row = []
    if(data.id){
        row = await get(table, data.id)
    }

  
    if (row.length === 0 ) {
        return insert(table, data);   
    } else {
       return update(table, data);
    }
}
function query(table, query, join) { // tabla principal donde se hace la busqueda 
    let joinQuery = '';
    if (join) {
        const key = Object.keys(join)[0]; // tabla
        const val = join[key]; // campo relacion 
        joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
    }

    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, query, (err, res) => {
            if (err) return reject(err);
            resolve(res|| null);
        })
    })
}

module.exports = {
    list,
    get,
    upsert,
    query
};















// ejecutar  como query en  workbanch - poder connectar con pass
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

