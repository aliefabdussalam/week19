const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.db_username,
  database: 'coffee_shop',
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('connect');
  }
});
module.exports = connection;
