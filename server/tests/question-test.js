/* eslint-disable */

import chai, { expect } from 'chai';
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
    it('PATCH /questions/:id/upvote', (done) => {
      const userId = 2;
      chai.request(app)
        .patch('/api/v1/questions/1/upvote')
        .type('form')
        .send({
          '_method': 'patch',
          'userId': userId,
        })
        .end((req, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a('array');
          res.body.data[0].should.be.a('object');
          expect(res.body.data[0].upVoters.find(item => item === userId)).to.equal(userId);
          expect(res.body.data[0].downVoters.find(item => item === userId)).to.equal(undefined);
          done();
        });
    });
    it('PATCH /questions/:id/downvote', (done) => {
      const userId = 2;
      chai.request(app)
        .patch('/api/v1/questions/1/downvote')
        .type('form')
        .send({
          '_method': 'patch',
          'userId': userId,
        })
        .end((req, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a('array');
          res.body.data[0].should.be.a('object');
          expect(res.body.data[0].downVoters.find(item => item === userId)).to.equal(userId);
          expect(res.body.data[0].upVoters.find(item => item === userId)).to.equal(undefined);
          done();
        });
    });
    it('GET /questions/ should return an array of all questions', (done) => {
      chai.request(app)
        .get('/api/v1/questions/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a('array');
          done();
        });
    });
    it('GET /questions/:id should return a single question', (done) => {
      chai.request(app)
        .get('/api/v1/questions/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a('object');
          done();
        });
    });
  });
  describe('Error handling for question routes', () => {
    it('POST /questions/ without required data should return an error', (done) => {
      chai.request(app)
        .post('/api/v1/questions')
        .send({})
        .end((err, res) => {
          res.should.have.status(400);
          res.body.error.should.be.a('string');
          done();
        });
    });
    it('PATCH /questions/:id/upvote without required data should return an error', (done) => {
      chai.request(app)
        .patch('/api/v1/questions/1/upvote')
        .send({})
        .end((err, res) => {
          res.should.have.status(400);
          res.body.error.should.be.a('string');
          done();
        });
    });
    it('PATCH /questions/:id/downvote without required data should return an error', (done) => {
      chai.request(app)
        .patch('/api/v1/questions/1/downvote')
        .send({})
        .end((err, res) => {
          res.should.have.status(400);
          res.body.error.should.be.a('string');
          done();
        });
    });
    describe('Multiple upvoting should return an error', () => {
      const userId = 4;
      before(()=> {
        chai.request(app)
          .patch('/api/v1/questions/1/upvote')
          .send({
            '_method': 'patch',
            'userId': userId,
          })
          .end();
      });
      it('PATCH /questions/:id/upvote should return an error', (done) => {
        chai.request(app)
          .patch('/api/v1/questions/1/upvote')
          .type('form')
          .send({
            '_method': 'patch',
            'userId': userId,
          })
          .end((req, res) => {
            res.should.have.status(400);
            res.body.error.should.equal('multiple voting is not possible');
            done();
          });
      });
    });
    describe('Multiple downvoting should return an error', () => {
      const userId = 4;
      before(()=> {
        chai.request(app)
          .patch('/api/v1/questions/1/downvote')
          .send({
            '_method': 'patch',
            'userId': userId,
          })
          .end();
      });
      it('PATCH /questions/:id/upvote should return an error', (done) => {
        chai.request(app)
          .patch('/api/v1/questions/1/downvote')
          .type('form')
          .send({
            '_method': 'patch',
            'userId': userId,
          })
          .end((req, res) => {
            res.should.have.status(400);
            res.body.error.should.equal('multiple voting is not possible');
            done();
          });
      });
    });
  });
}

export default questionTest;