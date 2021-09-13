const express = require('express');
const {
  getlist, getdetail, insert, update, destroy,
} = require('../controller/users');
const midauth = require('../middleware/authentication');
const authorization = require('../middleware/authorization');
const { setRedis } = require('../model/users.model');

const router = express.Router();
router
  .get('/user', getlist)
  .get('/user/:id', midauth, getdetail)
  .post('/user', insert)
  .put('/user/:id', update)
  .delete('/user/:id', midauth, authorization.isAdmin, destroy)
  .post('/set-redis', setRedis);

module.exports = router;
