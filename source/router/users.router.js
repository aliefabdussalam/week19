const express = require('express');
const {
  getlist, getdetail, insert, update, destroy,
} = require('../controller/users');
const midauth = require('../middleware/authentication');

const router = express.Router();
router
  .get('/user', midauth, getlist)
  .get('/user/:id', midauth, getdetail)
  .post('/user', midauth, insert)
  .put('/user/:id', midauth, update)
  .delete('/user/:id', midauth, destroy);

module.exports = router;
