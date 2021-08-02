const express = require('express');
const {
  getlist, getdetail, insert, update, destroy,
} = require('../controller/product');
const midauth = require('../middleware/authentication');

const router = express.Router();
router
  .get('/product', midauth, getlist)
  .get('/product/:id', midauth, getdetail)
  .post('/product', midauth, insert)
  .put('/product/:id', midauth, update)
  .delete('/product/:id', midauth, destroy);

module.exports = router;
