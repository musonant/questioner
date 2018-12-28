/* eslint-disable */

import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../../app';

chai.use(chaiHttp);
chai.should();

const questionTest = () => {
  describe('Test case for question route', () => {
    it('POST /questions/', (done) => {
      chai.request(app)
        .post('/api/v1/questions')
        .type('form')
        .send({
          'createdBy': 2,
          'meetup': 1,
          'authorName': 'James Jones',
          'body': 'What are the applications of asynchronous operations?',
        })
        .end((req, res) => {
          res.should.have.status(201);
          res.body.data.should.be.a('array');
          res.body.data[0].should.be.a('object');
          done();
        });
    });
  });
}

export default questionTest;