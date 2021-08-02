const db = require('../config/db');

const productmodel = {
  getAllData: () => new Promise((resolve, reject) => {
    db.query('select * from product', (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  getlist: (search, field, typeSort, limit, offset) => new Promise((resolve, reject) => {
    db.query(`SELECT * FROM product 
            WHERE product LIKE "%${search}%" 
            ORDER BY ${field} ${typeSort}
            LIMIT ${limit} OFFSET ${offset}`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  getdetail: (id, limit, offset) => new Promise((resolve, reject) => {
    db.query(`select * from product where id=${id} LIMIT ${limit} OFFSET ${offset}`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  insert: (idproduct, product, price, description, category, stock) => new Promise(
    (resolve, reject) => {
      db.query(`insert into product (id,product, price, description, category, stock) value ("${idproduct}","${product}","${price}","${description}","${category}","${stock}")`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    },
  ),
  destroy: (id) => new Promise((resolve, reject) => {
    db.query(`delete from product where id="${id}"`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  update: (idproduct, product, price, description, category, stock) => new Promise(
    (resolve, reject) => {
      db.query(`update product set product="${product}", price="${price}", description="${description}", category="${category}", stock="${stock}" where id="${idproduct}"`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    },
  ),
};
module.exports = productmodel;
