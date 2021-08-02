const express = require('express');
const {
  insert, login,
} = require('../controller/register');

const router = express.Router();
router
  .post('/register', insert)
  .post('/login', login);
module.exports = router;
