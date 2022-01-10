const express = require('express');

const response = require('../network/response');
const Store = require('../store/cache-redis/redis');

const secure = require('./secure');

const router = express.Router();

router.get('/:table',secure('token'),list);
router.get('/:table/:id', secure('token'), get);
router.post('/:table', secure('token'),upsert); 

async function list(req, res, next) {
    const datos = await Store.list(req.params.table)
    response.success(req, res, datos, 200);
}

async function get(req, res, next) {
    const datos = await Store.get(req.params.table, req.params.id)
    response.success(req, res, datos, 200);
}

async function upsert(req, res, next) {
    const datos = await Store.upsert(req.params.table, req.body)
    response.success(req, res, datos, 200);
}


module.exports = router;