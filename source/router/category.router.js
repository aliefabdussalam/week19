const express = require('express');
const {
  getlist, getdetail, insert, update, destroy,
} = require('../controller/category');
const midauth = require('../middleware/authentication');

const router = express.Router();
router
  .get('/category', midauth, getlist)
  .get('/category/:id', midauth, getdetail)
  .post('/category', midauth, insert)
  .put('/category/:id', midauth, update)
  .delete('/category/:id', midauth, destroy);

module.exports = router;
