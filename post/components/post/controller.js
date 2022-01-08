const TABLA = 'post';

module.exports = function (injectedStore) {

    //  esta parte llamada constructor fe la funcion - injeccion del store : stor nos ofrece conexion a db y funcione de interectuar a al misma 
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/remote-mysql');
    }

    function list() {
        return store.list(TABLA);
    }

    async function get(id) {
		
		const user = await store.get(TABLA, id);
		if (!user) {
			throw error('No existe el post', 404);
		}

		return user;
	}

	async function upsert(data, user) {
		const post = {
			id: data.id,
			user: user,
			text: data.text,
		}

		if (!post.id) {
			post.id = nanoid();
		}

		return Store.upsert(COLLECTION, post).then(() => post);
	}

	async function like(post, user) {
        const like = await Store.upsert(COLLECTION + '_like', {
            post: post,
            user: user,
        });

        return like;
	}

	async function postsLiked(user) {
		const users = await Store.query(COLLECTION + '_like', { user: user }, {post: post});
		return users;
	}

	async function postLikers(post) {
		const users = await Store.query(COLLECTION + '_like', { post: post }, {post: post});
		return users;
	}


    return {
        list,
        get,
		upsert,
		like,
		postsLiked,
		postLikers,
    };
}


// Metodologia 
// esta funcion exportada se ejecuta en el index , y el index la exporta al networl , como fue ejecutada en index , network accede a su returno y ejecta cierta funcion asyncrona que debe resolver algo .  