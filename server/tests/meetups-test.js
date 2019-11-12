/* eslint-disable */

import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);
chai.should();

const meetupTest = () => {
  describe('Test cases for meetups route', () => {
    const userEmail = 'johnnydrille@gmail.com';
    const adminEmail = 'mrmusonant@gmail.com';
    const userPassword = 'johnny';
    const adminPassword = 'emmanuel';
    let userToken = '';
    let adminToken = '';

    before((done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: userEmail,
          password: userPassword
        })
        .end((err, res) => {
          userToken = res.body.data.token;
        });

      chai.request(app)
        .post('/api/v1/auth/login')
        .type('form')
        .send({
          email: adminEmail,
          password: adminPassword
        })
        .end((err, res) => {
          adminToken = res.body.data.token;
          done();
        });
    });

    it('GET /meetups/ should return an array of all meetups', (done) => {
      chai.request(app)
        .get('/api/v1/meetups/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a('array');
          res.body.data[0].id.should.be.a('number');
          done();
        });
    });
    it('GET /meetups/:id should return a single meetup record', (done) => {
      const id = 1;
      chai.request(app)
        .get(`/api/v1/meetups/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a('array');
          res.body.data[0].id.should.equal(id);
          done();
        });
    });
    it('POST meetups', (done) => {
      chai.request(app)
        .post('/api/v1/meetups')
        .set('x-access-token', adminToken)
        .send({
          topic: '',
          createdBy: 1
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.data.should.be.a('array');
          res.body.data[0].id.should.be.a('number');
          done();
        })
    })
    it('GET /meetups?scope=upcoming', (done) => {
      chai.request(app)
        .get('/api/v1/meetups?scope=upcoming')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a('array');
          res.body.data[0].id.should.be.a('number');
          done();
        });
    });
    it('POST /meetups/:id/rsvps', (done) => {
      const response = 'true';
      chai.request(app)
        .post('/api/v1/meetups/1/rsvps')
        .set('x-access-token', userToken)
        .send({
          'user': 2,
          'response': response
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.data.should.be.a('array');
          res.body.data[0].should.be.a('object');
          res.body.data[0].response.should.equal(response);
          done();
        });
    });

    describe('Error handling for meetup routes', () => {
      it('GET /meetups/:id with wrong id should return error message', (done) => {
        chai.request(app)
          .get('/api/v1/meetups/0')
          .end((err, res) => {
            res.should.have.status(400);
            res.body.error.should.equal('this request contains an invalid parameter');
            done();
          });
      });
      it('GET non-existent meetup should return an error', (done) => {
        chai.request(app)
          .get('/api/v1/meetups/30000')
          .end((err, res) => {
            res.should.have.status(404);
            res.body.error.should.equal('Not found');
            done();
          });
      });
      it('POST /meetups/ without required data should return an error', (done) => {
        chai.request(app)
          .post('/api/v1/meetups/')
          .set('x-access-token', adminToken)
          .send({})
          .end((err, res) => {
            res.should.have.status(400);
            res.body.error.should.be.a('string');
            done();
          });
      });
      it('POST /meetups/:id/rsvps (creating invite response) without required data should return an error', (done) => {
        chai.request(app)
          .post('/api/v1/meetups/1/rsvps')
          .set('x-access-token', userToken)
          .send({})
          .end((err, res) => {
            res.should.have.status(400);
            res.body.error.should.be.a('string');
            done();
          });
      });
    });
  });
}

export default meetupTest;