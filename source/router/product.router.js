const express = require('express');
const {
  getlist, getdetail, insert, update, destroy, transaction, getdataTransaction, getAllData,
} = require('../controller/product');
const midauth = require('../middleware/authentication');
// const authorization = require('../middleware/authorization');
const upload = require('../middleware/upload');

const router = express.Router();
router
  .post('/product/transaksi/', midauth, transaction)
  .get('/product/transaksi', getdataTransaction)
  .get('/product', midauth, getlist)
  .get('/product/:id', midauth, getdetail)
  .post('/product', midauth, upload, insert)
  .put('/product/:id', midauth, upload, update)
  .get('/product-all', getAllData)
  .delete('/product/:id', destroy);

module.exports = router;
