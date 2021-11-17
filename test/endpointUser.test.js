/* eslint-disable no-undef */
const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsImlhdCI6MTYzMTU0NjgyOH0.AKnzDiEGk_low3h8fYvjujZFLQbpH4IbbF5y7ZxA2o0';
const tokenuser = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzMsImlhdCI6MTYzMTU1NzQ0M30.CTx2BNjQuHo_vHKM3FRT5Rc8mFIWS_Y5Gt4QNoBX8zA';

describe('test endpoint users true', () => {
  it('get list redis with query search', () => {
    request(app)
      .get('/user?search=%zubair%')
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
  it('get API all if true', () => {
    request(app)
      .get('/user-all')
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('data');
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('get list with query search, limit, sort and pagination', () => {
    request(app) // redis not covered yet
      .get('/user?search=%a%&limit=5&page=2&typesort=DESC')
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
  it('get detail user if true', () => {
    request(app) // redis not covered yet
      .get('/user/2')
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
  it('register if true', () => {
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
  it('user post if true', () => {
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
  it('login if true', () => {
    const payload = {
      emailAddress: 'lalaland',
      password: '123',
      level: 1,
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
  it('put user with no file', () => {
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
  it('destroy user', () => {
    request(app) // redis not covered yet
      .delete('/user/91')
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

describe('test endpoint users false', () => {
  it('get detail', () => {
    request(app) // redis not covered yet
      .get('/user/1000')
      .set('token', token)
      .expect(404);
  });
  it('login email incorect', () => {
    const payload = {
      emailAddress: '@cba.com',
      password: '123',
    };
    request(app)
      .post('/login')
      .send(payload)
      .expect('Content-Type', /json/)
      .expect(404);
  });
  it('login pass incorect', () => {
    const payload = {
      emailAddress: 'user@cba.com',
      password: '787807867987078',
      level: 1,
    };
    request(app)
      .post('/login')
      .send(payload)
      .expect('Content-Type', /json/)
      .expect(404);
  });
  it('del user if token is user', () => {
    request(app) // redis not covered yet
      .delete('/user/91')
      .set('token', tokenuser)
      .expect('Content-Type', /json/)
      .expect(401)
      .then((response) => {
        expect(response.body).to.be.a('object');
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
