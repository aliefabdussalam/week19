/* eslint-disable no-undef */
const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

describe('test endpoint category true', () => {
  it('get API', () => {
    request(app)
      .get('/category')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsImlhdCI6MTYzMDgyNDI4M30.2DGBRi_DBZGCM8GcQQtD5uaayMDShoT4B4Fl3aFRu-8')
      .expect('Content-Type', /json/)
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
      .get('/category?search=%a%&limit=5&page=1')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsImlhdCI6MTYzMDgyNDI4M30.2DGBRi_DBZGCM8GcQQtD5uaayMDShoT4B4Fl3aFRu-8')
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
      .get('/category/5')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsImlhdCI6MTYzMDgyNDI4M30.2DGBRi_DBZGCM8GcQQtD5uaayMDShoT4B4Fl3aFRu-8')
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
  it('category post', () => {
    const payload = {
      id: 9,
      category: 'add',
    };
    request(app)
      .post('/category')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsImlhdCI6MTYzMDgyNDI4M30.2DGBRi_DBZGCM8GcQQtD5uaayMDShoT4B4Fl3aFRu-8')
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
  it('put', () => {
    const payload = {
      id: 2,
      category: 'add',
    };
    request(app)
      .put('/category/2')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsImlhdCI6MTYzMTU0NjgyOH0.AKnzDiEGk_low3h8fYvjujZFLQbpH4IbbF5y7ZxA2o0')
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
  it('del category', () => {
    request(app) // redis not covered yet
      .delete('/category/4')
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
