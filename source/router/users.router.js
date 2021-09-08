const express = require('express');
const {
  getlist, getdetail, insert, update, destroy,
} = require('../controller/users');
const midauth = require('../middleware/authentication');
const authorization = require('../middleware/authorization');
const { setRedis } = require('../model/users.model');

const router = express.Router();
router
  .get('/user', midauth, getlist)
  .get('/user/:id', midauth, getdetail)
  .post('/user', midauth, insert)
  .put('/user/:id', midauth, update)
  .delete('/user/:id', midauth, authorization.isAdmin, destroy)
  .post('/set-redis', setRedis);

module.exports = router;
