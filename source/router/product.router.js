const express = require('express');
const {
  getlist, getdetail, insert, update, destroy, transaction, transactiondtl, getdataTransaction,
} = require('../controller/product');
const midauth = require('../middleware/authentication');
const authorization = require('../middleware/authorization');
const upload = require('../middleware/upload');
const { setprdRedis } = require('../model/product.model');

const router = express.Router();
router

  .post('/product/transaksi/', midauth, transaction)
  .post('/product/transaksidtl/', midauth, transactiondtl)
  .get('/product/transaksi', getdataTransaction)
  .get('/product', midauth, getlist)
  .get('/product/:id', midauth, getdetail)
  .post('/product', midauth, authorization.isAdmin, upload, insert)
  .put('/product/:id', midauth, authorization.isAdmin, upload, update)
  .delete('/product/:id', midauth, authorization.isAdmin, destroy)
  .post('/set-prd-redis', setprdRedis);

module.exports = router;
