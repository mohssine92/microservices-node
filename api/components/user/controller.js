// para generar ids
const nanoid = require('nanoid');
const chalk = require('chalk')

// simplemente traemos index y el index va definir cual es almacenamiento de produccion db - store - y el resto sera automatico 
const auth = require('../auth');

const TABLA = 'user';

module.exports = function (injectedStore,injectedCache) {

    let store = injectedStore;
    let cache = injectedCache;
    if (!store) {
        store = require('../../../store/remote-mysql');
    }
    if (!cache) {
        cache = require('../../../store/cache-redis/remote-cache');
    }

    async function list() {
        // Strategia de cache : Decidir primero se esta en cacheo sino ejecutamos la funcion paraque se Trae desde la db Mysql en este caso etc ...
        let users = await cache.list(TABLA);

        if (!users) {
           
            console.log(`${chalk.bgGreen('No estaba en caché. Buscado en DB')}` );
            users = await store.list(TABLA);
            await cache.upsert(TABLA, users);
           
        } else {
           
            console.log(`${chalk.bgRed('Nos traemos datos de cache')}` );
        }
        return users;


    } 

    function get(id) {
        return store.get(TABLA, id);
    }

    async function upsert(body) {
       
        const user = {
            name: body.name,
            username: body.username
        }

        if (body.id) {
            user.id = body.id;
        } else {
            // generador de ids
            user.id = nanoid();
        }



        // si viene estos props campos los actualizamos
        if (body.password || body.username) {
           
            await auth.upsert({
                id: user.id,
                username: user.username,
                password: body.password,
            })
        }

        
        // el objeto que viaja al api de db , como usamos  metodologia generica - no mandamos password a la tabla user 
        return store.upsert(TABLA, user);
    }

    function follow(from, to) {

        // TODO: validar si existe registro de llave compuesta
        return store.follow(TABLA + '_follow', {
            user_from: from,
            user_to: to,
        });
    }
    
    async function following(user) { // user = id del user 
        const join = {}
        join[TABLA] = 'user_to'; // { user: 'user_to' } tabla : campo relacion 
        const query = { user_from: user }; // query es campo en que se basa la busqueda en la tabla principal

        // console.log(join);
        // console.log(TABLA);
        // console.log(query);
       
		return await store.join(TABLA + '_follow', query, join);
	}


    return {
        list,
        get,
        upsert,
        follow,
        following,
    }; 

}


// controller si tiene acceso a la parte de db 
// la capa de red , network no tiene sentido tener acceso a a la capa de almazenamiento store
// la capa de networl tiene acceco al controller - la capa de network es donde tenemos router
// NB: una nota importante crear autorizacion  cada vez creamos un usuario 
 