/* eslint-disable */

import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../../app';

chai.use(chaiHttp);
chai.should();

const testMeetup = () => {
  describe('Test case for Meetup route', () => {
    it('GET /meetups/ should return an array of all meetups', (done) => {
      chai.request(app)
        .get('/api/v1/meetups/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a('array');
          done();
        });
    });
    
    it('GET /meetups/:id should return a single meetup record', (done) => {
      chai.request(app)
        .get('/api/v1/meetups/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a('object');
          done();
        });
    });
    it('POST /meetups/', (done) => {
      chai.request(app)
        .post('/api/v1/meetups/')
        .type('form')
        .send({
          'topic': 'Some title',
          'createdBy': 1
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.data.should.be.a('array');
          res.body.data[0].should.be.a('object');
          done();
        });
    });
    it('GET /meetups?scope=upcoming', (done) => {
      chai.request(app)
        .get('/api/v1/meetups?scope=upcoming')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a('array');
          res.body.data[0].should.be.a('object');
          done();
        });
    });
    it('POST /meetups/:id/rsvps', (done) => {
      chai.request(app)
        .post('/api/v1/meetups/1/rsvps')
        .type('form')
        .send({
          'user': 2,
          'response': 'yes',
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.data.should.be.a('array');
          res.body.data[0].should.be.a('object');
          done();
        });
    });
  });
}

export default testMeetup;