const express = require('express');
const {
  getlist, getdetail, insert, update, destroy, transaction, getdataTransaction, getAllData,
} = require('../controller/product');
const midauth = require('../middleware/authentication');
const authorization = require('../middleware/authorization');
const upload = require('../middleware/upload');

const router = express.Router();
router
  .get('/product-all', getAllData)
  .post('/product/transaksi/', midauth, transaction)
  .get('/product/transaksi', getdataTransaction)
  .get('/product', midauth, getlist)
  .get('/product/:id', midauth, getdetail)
  .post('/product', midauth, authorization.isAdmin, upload, insert)
  .put('/product/:id', midauth, authorization.isAdmin, upload, update)
  .delete('/product/:id', destroy);

module.exports = router;
