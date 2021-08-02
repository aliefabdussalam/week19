const db = require('../config/db');

const categorymodel = {
  getAllData: () => new Promise((resolve, reject) => {
    db.query('select * from category', (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  getlist: (search, field, typeSort, limit, offset) => new Promise((resolve, reject) => {
    db.query(`SELECT * FROM category 
            WHERE category LIKE "%${search}%" 
            ORDER BY ${field} ${typeSort}
            LIMIT ${limit} OFFSET ${offset}`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  getdetail: (id, offset, limit) => new Promise((resolve, reject) => {
    db.query(`select * from category where id=${id}
    LIMIT ${limit} OFFSET ${offset}`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  insert: (idcategory, category) => new Promise((resolve, reject) => {
    db.query(`insert into category (id,category) value ("${idcategory}","${category}")`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  destroy: (id) => new Promise((resolve, reject) => {
    db.query(`delete from category where id="${id}"`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  update: (idcategory, category) => new Promise((resolve, reject) => {
    db.query(`update category set category="${category}" where id="${idcategory}"`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
};
module.exports = categorymodel;
