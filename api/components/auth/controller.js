const bcrypt = require('bcrypt');

const auth = require('../../../auth');
const TABLA = 'auth';

module.exports = function (injectedStore) {

    // comprobar el stor que tiene que ser en caso que no usamos el store que queramos - ventajas de trabajar archivo db como injeccion del controller
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    async function login(username, password) { 
        const data = await store.query(TABLA, { username: username });
       
        // recibe pass plano lo compara con pass cryptado por funcion hash de la misma libreria  - video 10 
        return bcrypt.compare(password, data.password)
        .then(sonIguales => {
            if (sonIguales === true) {
                // Generar token;
                return auth.sign(data)
            } else {
                throw new Error('Informacion invalida');
            }
        });

    }


    // para hacer cualquier insertacion  o actualizacion de ususario 
    async function upsert(data) {
        // eso nos va permitir trabaja de forma separada y crear solamente los campos que necesitams paraque cuando nuestra tabla esta en actualizacion actualiza solamente lo que necesita 
        const authData = {
            id: data.id,
        }

        // mira si hay username y lo actualiza ..
        if (data.username) {
            authData.username = data.username;
        }

        if (data.password) {
            // hashear pass en lugar se guarde en plano  en db se guarde hasheado - entre 5-10 es buen numero - mas largo mas seguro mas lento 
            authData.password = await bcrypt.hash(data.password, 5);
        }
        
        return store.upsert(TABLA, authData);
    }

    return {
        login,
        upsert,
    };
};


// dentro del controller del compoenete donde tomamos la decicion que tabla usamos , puesto que store nos exporta funciones genericas abiertas  a tablas segun le injectamos  