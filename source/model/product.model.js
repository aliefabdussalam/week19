const db = require('../config/db');
const client = require('../helper/redis');

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
  insert: (idproduct, product, price, description, category, stock, image) => new Promise(
    (resolve, reject) => {
      db.query(`insert into product (id,product, price, description, category, stock, image) value ("${idproduct}","${product}","${price}","${description}","${category}","${stock}","${image}")`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          // eslint-disable-next-line no-shadow
          resolve(result, db.query('select * from product', (err, resultredis) => {
            client.set('product', JSON.stringify(resultredis));
          }));
        }
      });
    },
  ),
  transaction: (idTransDtl, idUser, address, details,
    payment, subtotal, tax, shipping) => new Promise(
    (resolve, reject) => {
      db.query(`insert into transaksi (id_transaction, id_user, address, payment, subtotal, tax, shiping) value ("${idTransDtl}","${idUser}","${address}","${payment}","${subtotal}","${tax}","${shipping}")`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          // const idtransaction = result.insertId;
          // const insertdetail = details.map((e) => {
          //   db.query(`
          //   insert into transaksi_dtl
          //   (id_product, qty, price, id_transaction)
          //   value
          //   ('${e.idProduct}', '${e.price}', '${e.qty}', '${idtransaction}')
          //   `, (error, result) => {
          //     if (error) {
          //       console.log(err);
          //     } else {
          //       return
          //     }
          //   });
          // });

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
  update: (idproduct, product, price, description, category, stock, image) => new Promise(
    (resolve, reject) => {
      db.query(`update product set product="${product}", price="${price}", description="${description}", category="${category}", stock="${stock}", image="${image}" where id="${idproduct}"`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    },
  ),
  setprdRedis: (req, res) => {
    db.query('select * from product', (err, result) => {
      client.set('product', JSON.stringify(result));
      res.json(result);
    });
  },
  getAllDatatrans: () => new Promise((resolve, reject) => {
    db.query('select * from transaksi', (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  getdataTransaction: (search, field, typeSort, limit, offset) => new Promise((resolve, reject) => {
    db.query(`SELECT * FROM transaksi 
            WHERE id LIKE "%${search}%" 
            ORDER BY ${field} ${typeSort}
            LIMIT ${limit} OFFSET ${offset}`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
};
module.exports = productmodel;
