/* eslint-disable no-undef */
const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

describe('test endpoint users true', () => {
  it('get list redis', () => {
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
  it('tget API', () => {
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
  it('get list', () => {
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
  it('get detail', () => {
    request(app) // redis not covered yet
      .get('/user/2')
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
  it('user post', () => {
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
  it('put', () => {
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
  it('del user', () => {
    request(app) // redis not covered yet
      .delete('/user/91')
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
  it('get detail', () => {
    request(app) // redis not covered yet
      .get('/user/1000')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsImlhdCI6MTYzMDgyNDI4M30.2DGBRi_DBZGCM8GcQQtD5uaayMDShoT4B4Fl3aFRu-8')
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
    };
    request(app)
      .post('/login')
      .send(payload)
      .expect('Content-Type', /json/)
      .expect(404);
  });
  it('del user', () => {
    request(app) // redis not covered yet
      .delete('/user/91')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzMsImlhdCI6MTYzMTU1NzQ0M30.CTx2BNjQuHo_vHKM3FRT5Rc8mFIWS_Y5Gt4QNoBX8zA')
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
