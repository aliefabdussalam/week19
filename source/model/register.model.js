const db = require('../config/db');
const client = require('../helper/redis');

const registermodel = {
  insert: (data) => new Promise((resolve, reject) => {
    const {
      id, displayName, firstName, lastName, birthDay, gender, emailAddress,
      deliveryAddress, numberPhone, level, password,
    } = data;
    db.query(`insert into users (id,display_name, first_name, last_name, birth_day, gender, email_address, delivery_address, number_phone, level, password) 
    value ("${id}","${displayName}","${firstName}","${lastName}","${birthDay}","${gender}", "${emailAddress}", "${deliveryAddress}", "${numberPhone}", "${level}", "${password}")`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        // eslint-disable-next-line no-shadow
        resolve(result, db.query('select * from users', (err, resultredis) => {
          client.set('users', JSON.stringify(resultredis));
        }));
      }
    });
  }),
  login: (body) => new Promise((resolve, reject) => {
    const { emailAddress } = body;
    db.query(`select * from users where email_address = '${emailAddress}'`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
};
module.exports = registermodel;
