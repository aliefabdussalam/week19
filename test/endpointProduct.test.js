/* eslint-disable no-undef */
const request = require('supertest');
const { expect } = require('chai');
const fs = require('fs');
const app = require('../app');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsImlhdCI6MTYzMTU0NjgyOH0.AKnzDiEGk_low3h8fYvjujZFLQbpH4IbbF5y7ZxA2o0';

describe('test endpoint product true', () => {
  it('get API if true', () => {
    request(app)
      .get('/product-all')
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('data');
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('get list redis if true', () => {
    request(app)
      .get('/product?search=%a%&')
      .set('token', token)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('success');
        expect(response.body).to.have.property('data');
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('transaction if true', () => {
    const payload = {
      idUser: 2,
      address: 'pajang',
      details: [
        {
          idProduct: 1,
          qty: 2,
          price: 4000,
        },
        {
          idProduct: 1,
          qty: 2,
          price: 4000,
        },
      ],
      payment: 'cash',
      subtotal: 80000,
      tax: 8000,
      shipping: 10000,
    };
    request(app)
      .post('/product/transaksi')
      .set('token', token)
      .send(payload)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('data');
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('get list search limit pagination if true', () => {
    request(app) // redis not covered yet
      .get('/product?search=%a%&limit=5&page=2')
      .set('token', token)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('success');
        expect(response.body).to.have.property('data');
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('get detail product if true', () => {
    request(app) // redis not covered yet
      .get('/product/2')
      .set('token', token)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('success');
        expect(response.body).to.have.property('data');
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('get all transaction if true', () => {
    request(app) // redis not covered yet
      .get('/product/transaksi')
      .set('token', token)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('success');
        expect(response.body).to.have.property('data');
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('post product with file if true', () => {
    const filepath = `${__dirname}/helper/img/5930520.png`;
    fs.exists(filepath, (exists) => {
      if (!exists) {
        console.log('file tidak ada');
      } else {
        request(app)
          .post('/product')
          .set('token', token)
          .field('productName', 'sayur')
          .field('price', '50000')
          .field('description', 'enak')
          .field('category', '5add-on')
          .field('stock', '50')
          .attach('image', filepath)
          .expect('Content-Type', /json/)
          .expect(200)
          .then((response) => {
            expect(response.body).to.be.a('object');
            expect(response.body).to.have.property('data');
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  });
  it('put product with file if true', () => {
    const filepath = `${__dirname}/helper/img/5930520.png`;
    fs.exists(filepath, (exists) => {
      if (!exists) {
        console.log('file tidak ada');
      } else {
        request(app)
          .put('/product/14')
          .set('token', token)
          .field('productName', 'sayur')
          .field('price', '50000')
          .field('description', 'enak')
          .field('category', '5add-on')
          .field('stock', '50')
          .attach('image', filepath)
          .expect('Content-Type', /json/)
          .expect(200)
          .then((response) => {
            expect(response.body).to.be.a('object');
            expect(response.body).to.have.property('data');
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  });
  it('destroy product if true', () => {
    request(app) // redis not covered yet
      .delete('/product/10')
      .set('token', token)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('success');
        expect(response.body).to.have.property('data');
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
describe('test endpoint product false', () => {
  it('put prd img format unknown', () => {
    const filepath = `${__dirname}/helper/img/app.js`;
    fs.exists(filepath, (exists) => {
      if (!exists) {
        console.log('file tidak ada');
      } else {
        request(app)
          .put('/product/14')
          .set('token', token)
          .field('productName', 'sayur')
          .field('price', '50000')
          .field('description', 'enak')
          .field('category', '5add-on')
          .field('stock', '50')
          .attach('image', filepath)
          .expect('Content-Type', /json/)
          .then((response) => {
            expect(response.body).to.be.a('object');
            expect(response.body).to.have.property('message');
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  });
  it('get detail product if product empty', () => {
    request(app) // redis not covered yet
      .get('/product/500000')
      .set('token', token)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('message');
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
