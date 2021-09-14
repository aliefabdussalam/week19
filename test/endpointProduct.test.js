/* eslint-disable no-undef */
const request = require('supertest');
const { expect } = require('chai');
const fs = require('fs');
const app = require('../app');

describe('test endpoint product true', () => {
  it('tget API', () => {
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
  it('get list redis', () => {
    request(app)
      .get('/product?search=%a%&')
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
  it('transaksi', () => {
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
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzMsImlhdCI6MTYzMTU1NzQ0M30.CTx2BNjQuHo_vHKM3FRT5Rc8mFIWS_Y5Gt4QNoBX8zA')
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
  it('get list', () => {
    request(app) // redis not covered yet
      .get('/product?search=%a%&limit=5&page=2')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsImlhdCI6MTYzMTU0NjgyOH0.AKnzDiEGk_low3h8fYvjujZFLQbpH4IbbF5y7ZxA2o0')
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
  it('get detail', () => {
    request(app) // redis not covered yet
      .get('/product/2')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsImlhdCI6MTYzMTU0NjgyOH0.AKnzDiEGk_low3h8fYvjujZFLQbpH4IbbF5y7ZxA2o0')
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
  it('get transaksi', () => {
    request(app) // redis not covered yet
      .get('/product/transaksi')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsImlhdCI6MTYzMTU0NjgyOH0.AKnzDiEGk_low3h8fYvjujZFLQbpH4IbbF5y7ZxA2o0')
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
  it('post prd', () => {
    const filepath = `${__dirname}/helper/img/5930520.png`;
    fs.exists(filepath, (exists) => {
      if (!exists) {
        console.log('file tidak ada');
      } else {
        request(app)
          .post('/product')
          .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsImlhdCI6MTYzMTU0NjgyOH0.AKnzDiEGk_low3h8fYvjujZFLQbpH4IbbF5y7ZxA2o0')
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
  it('put prd', () => {
    const filepath = `${__dirname}/helper/img/5930520.png`;
    fs.exists(filepath, (exists) => {
      if (!exists) {
        console.log('file tidak ada');
      } else {
        request(app)
          .put('/product/14')
          .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsImlhdCI6MTYzMTU0NjgyOH0.AKnzDiEGk_low3h8fYvjujZFLQbpH4IbbF5y7ZxA2o0')
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
  it('del product', () => {
    request(app) // redis not covered yet
      .delete('/product/10')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsImlhdCI6MTYzMTU0NjgyOH0.AKnzDiEGk_low3h8fYvjujZFLQbpH4IbbF5y7ZxA2o0')
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
describe('test endpoint users false', () => {
  it('put prd img format unknown', () => {
    const filepath = `${__dirname}/helper/img/app.js`;
    fs.exists(filepath, (exists) => {
      if (!exists) {
        console.log('file tidak ada');
      } else {
        request(app)
          .put('/product/14')
          .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsImlhdCI6MTYzMTU0NjgyOH0.AKnzDiEGk_low3h8fYvjujZFLQbpH4IbbF5y7ZxA2o0')
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
});
