/* eslint-disable */

import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import meetupTest from './meetups-test';
import questionTest from './question-test';
import app from '../../app';

chai.use(chaiHttp);
chai.should();

describe('Test cases for Questioner API', () => {
  describe('Test cases for API Home route', () => {
    it('GET "/" Should return a welcome message', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.equal('The amazing Questioner APP');
          done();
        });
    });
    it('GET "/api/v1/" Should return a welcome message', (done) => {
      chai.request(app)
        .get('/api/v1/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.be.a('string');
          done();
        });
    });
  });
  describe('Test case for Routes that are not provided', () => {
    it('GET "/find/something/lame/" Should return an error', (done) => {
      chai.request(app)
        .get('/find/something/lame')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.error.should.equal('This path does not exist');
          done();
        });
    });
  });

  meetupTest();
  questionTest();
});
