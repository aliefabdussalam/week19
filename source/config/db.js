const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.db_host,
  user: process.env.db_username,
  password: process.env.db_password,
  database: process.env.db_name,
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('connect');
  }
});
module.exports = connection;
