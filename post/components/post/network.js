const express = require('express');

const response = require('../../../network/response');
const auth = require('./secure');
const Controller = require('./index');

const router = express.Router();

// Routes
router.get('/', list);
router.get('/like', auth('list_own'), postsLiked);
router.get('/:id', auth('get'), get); 
router.post('/', auth('add',), upsert);
router.put('/', auth('update', { owner: 'user' }), upsert);
router.post('/:id/like', auth('add'), like);
router.get('/:id/like', auth('list'), postLikers);


// functions
function list(req, res, next) {
    Controller.list()
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next);
}


function get(req, res, next) {
	
	Controller.get(req.params.id)
		.then(post => {
			const data = post.body[0];
			response.success(req, res, data, 200);
		})
		.catch(next);
}

function upsert(req, res, next) {
	Controller.upsert(req.body, req.user.id)
		.then(post => {
			response.success(req, res, post, 201);
		})
		.catch(next);
}

function like(req, res, next) {
	Controller.like(req.params.id, req.user.sub)
		.then(post => {
			response.success(req, res, post, 201);
		})
		.catch(next);
}

function postLikers(req, res, next) {
	Controller.postLikers(req.params.id)
		.then(post => {
			response.success(req, res, post, 200);
		})
		.catch(next);
}

function postsLiked(req, res, next) {
	Controller.postsLiked(req.user.sub)
		.then(post => {
			response.success(req, res, post, 200);
		})
		.catch(next);
}




module.exports = router;