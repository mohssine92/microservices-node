
// db falsa 
const db = {
    'user': [
        { id: '1', name: 'Carlos' },
    ],
};

async function list(tabla) {
    return db[tabla];
}

async function get(tabla, id) {
    let col = await list(tabla);
    return col.filter(item => item.id === id)[0] || null;
}

async function upsert(tabla, data) {
    // pregunto si no existe la table en mi db artificial la creo como nombre de tabla llave dentro del objetc my db y su valor coleccion vacia 
    if (!db[tabla]) {
        db[tabla] = [];
    }

    db[tabla].push(data);

    console.log(db);
}

async function remove(tabla, id) {
    return true;
}

async function query(tabla, q) {
    // traer lista de tabla 
    let col = await list(tabla); 
    // forma de extraer key de un object
    let keys = Object.keys(q);
    let key = keys[0];
    
    return col.filter(item => item[key] === q[key])[0] || null;
}


module.exports = {
    list,
    get,
    upsert,
    remove,
    query
};

// Aislar el código de la base de datos  4/29 - conforme vayamaos teniendo diferentes dbs vayamos guardandolos en store
// aqui tenemos archivo de config de db , en caso de cambiar db , cambiamos este archivo y punto 
// este archivo sera renderizado derictamente desde controladores  .
