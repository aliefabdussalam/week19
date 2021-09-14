const db = require('../config/db');
const client = require('../helper/redis');
// const redisAction = require('../helper/redis');

const usermodel = {
  getAllData: () => new Promise((resolve, reject) => {
    db.query('select * from users', (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
        client.set('users', JSON.stringify(result));
      }
    });
  }),
  getlist: (search, field, typeSort, limit, offset) => new Promise((resolve, reject) => {
    db.query(`SELECT * FROM users 
            WHERE display_name LIKE "%${search}%" 
            ORDER BY ${field} ${typeSort}
            LIMIT ${limit} OFFSET ${offset}`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  getdetail: (id) => new Promise((resolve, reject) => {
    db.query(`select * from users where id=${id}`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  insert: (id, displayName, firstName, lastName,
    birthDay, gender, emailAddress, deliveryAddress, numberPhone, password) => new Promise(
    (resolve, reject) => {
      db.query(`insert into users (id,display_name, first_name, last_name, birth_day, gender, email_address, delivery_address, number_phone, password) value ("${id}","${displayName}","${firstName}","${lastName}","${birthDay}","${gender}", "${emailAddress}", "${deliveryAddress}", "${numberPhone}", "${password}")`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    },
  ),
  destroy: (id) => new Promise((resolve, reject) => {
    db.query(`delete from users where id="${id}"`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  update: (id, displayName, firstName, lastName,
    birthDay, gender, emailAddress, deliveryAddress, numberPhone, password) => new Promise(
    (resolve, reject) => {
      db.query(`update users set display_name="${displayName}", first_name="${firstName}", last_name="${lastName}", birth_day="${birthDay}", gender="${gender}", email_address="${emailAddress}", delivery_address="${deliveryAddress}", number_phone="${numberPhone}", password="${password}" where id="${id}"`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    },
  ),
};
module.exports = usermodel;
