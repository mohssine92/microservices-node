// para generar ids
const nanoid = require('nanoid');

// simplemente traemos index y el index va definir cual es almacenamiento de produccion db - store - y el resto sera automatico 
const auth = require('../auth');

const TABLA = 'user';

module.exports = function (injectedStore) {

    let store = injectedStore;
    if (!store) {
        store = require('../../../store/mysql');
    }

    function list() {
        return store.list(TABLA);
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

        return store.upsert(TABLA, user);
    }

    function follow(from, to) {
        return store.upsert(TABLA + '_follow', {
            user_from: from,
            user_to: to,
        });
    }
    async function following(user) { // user = id del user 
        const join = {}
        join[TABLA] = 'user_to'; // { user: 'user_to' } tabla : campo relacion 
        const query = { user_from: user }; // query es campo en que se basa la busqueda en la tabla principal
		
		return await store.query(TABLA + '_follow', query, join);
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
 