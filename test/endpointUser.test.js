/* eslint-disable no-undef */
const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

describe('test endpoint users', () => {
  it('test get API', () => {
    request(app)
      .get('/user')
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('data');
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

describe('test endpoint users', () => {
  it('test get /', () => {
    request(app)
      .get('/user')
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).to.be.a('object');
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

describe('test register', () => {
  it('register', () => {
    const payload = {
      displayName: 'ariel',
      firstName: 'ariel',
      lastName: 'husein',
      birthDay: '2002-03-15T17:00:00.000Z',
      gender: 'male',
      emailAddress: 'ariel@cba.com',
      deliveryAddress: 'makamhaji, surakarta',
      numberPhone: 2147483647,
      password: '1234567',
      level: 1,
    };
    request(app)
      .post('/register')
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
});

describe('test post user', () => {
  it('user', () => {
    const payload = {
      displayName: 'ariel',
      firstName: 'ariel',
      lastName: 'husein',
      birthDay: '2002-03-15T17:00:00.000Z',
      gender: 'male',
      emailAddress: 'ariel@cba.com',
      deliveryAddress: 'makamhaji, surakarta',
      numberPhone: 2147483647,
      password: '1234567',
      level: 1,
    };
    request(app)
      .post('/user')
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
});

describe('test login', () => {
  it('login', () => {
    const payload = {
      emailAddress: 'ariel@cba.com',
      password: '1234567',
    };
    request(app)
      .post('/login')
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
});

describe('test post user', () => {
  it('post', () => {
    const payload = {
      displayName: 'ariel',
      firstName: 'ariel',
      lastName: 'husein',
      birthDay: '2002-03-15T17:00:00.000Z',
      gender: 'male',
      emailAddress: 'ariel@cba.com',
      deliveryAddress: 'makamhaji, surakarta',
      numberPhone: 2147483647,
      password: '1234567',
      level: 1,
    };
    request(app)
      .put('/user/41')
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
});
