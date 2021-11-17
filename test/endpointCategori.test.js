/* eslint-disable no-undef */
const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsImlhdCI6MTYzMDgyNDI4M30.2DGBRi_DBZGCM8GcQQtD5uaayMDShoT4B4Fl3aFRu-8';

describe('test endpoint category true', () => {
  it('get API if true', () => {
    request(app)
      .get('/category')
      .set('token', token)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('data');
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('get list with query if true', () => {
    request(app) // redis not covered yet
      .get('/category?search=%a%&limit=5&page=1')
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
  it('get detail if true', () => {
    request(app) // redis not covered yet
      .get('/category/5')
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
  it('category post if true', () => {
    const payload = {
      id: 9,
      category: 'add',
    };
    request(app)
      .post('/category')
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
  it('put category if true', () => {
    const payload = {
      id: 2,
      category: 'add',
    };
    request(app)
      .put('/category/2')
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
  it('del category if true', () => {
    request(app) // redis not covered yet
      .delete('/category/4')
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
describe('test endpoint category false', () => {
  it('get detail category if category empty', () => {
    request(app) // redis not covered yet
      .get('/category/4000')
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
