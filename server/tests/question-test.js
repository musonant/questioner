/* eslint-disable */

import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../../app';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { log } from 'util';

dotenv.config();
chai.use(chaiHttp);
chai.should();

const questionTest = () => {
  describe('Test case for question route', () => {
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
          userToken = res.body.data[0].token;
        });

      chai.request(app)
        .post('/api/v1/auth/login')
        .type('form')
        .send({
          email: adminEmail,
          password: adminPassword
        })
        .end((err, res) => {
          adminToken = res.body.data[0].token;
          done();
        });
    });

    it('POST /questions/', (done) => {
      chai.request(app)
        .post('/api/v1/questions')
        .set('x-access-token', userToken)
        .send({
          'meetup': 1,
          'body': 'What are the applications of asynchronous operations?',
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.data.should.be.a('array');
          res.body.data[0].should.be.a('object');
          res.body.data[0].id.should.be.a('number');
          res.body.data[0].body.should.equal('What are the applications of asynchronous operations?');
          done();
        });
    });
    describe('Upvoting and downvoting', () => {
      const questionId = 1;
      let decoded = {};
      before(async () => {
        try {
          decoded = await jwt.verify(userToken, process.env.JWT_SECRET);
        } catch (err) { throw err; }
      })
      it('PATCH /questions/:id/upvote', (done) => {
        
        chai.request(app)
          .patch(`/api/v1/questions/${questionId}/upvote`)
          .set('x-access-token', userToken)
          .send({
            '_method': 'patch',
          })
          .end((req, res) => {
            res.should.have.status(200);
            res.body.data.should.be.a('array');
            res.body.data[0].should.be.a('object');
            res.body.data[0].id.should.equal(questionId);
            expect(res.body.data[0].upVoters.find(item => Number(item) === decoded.id)).to.equal(String(decoded.id));
            expect(res.body.data[0].downVoters.find(item => Number(item) === decoded.id)).to.equal(undefined);
            done();
          });
      });
      it('PATCH /questions/:id/downvote', (done) => {
        chai.request(app)
          .patch(`/api/v1/questions/${questionId}/downvote`)
          .set('x-access-token', userToken)        
          .send({
            '_method': 'patch',
          })
          .end((req, res) => {
            setTimeout(() => {
              console.log(res.body);
            }, 2000)
            
            res.should.have.status(200);
            res.body.data.should.be.a('array');
            res.body.data[0].should.be.a('object');
            res.body.data[0].id.should.equal(questionId);
            expect(res.body.data[0].upVoters.find(item => Number(item) === decoded.id)).to.equal(undefined);
            expect(res.body.data[0].downVoters.find(item => Number(item) === decoded.id)).to.equal(String(decoded.id));
            done();
          });
      });
    })
    it('GET /questions/ should return an array of all questions', (done) => {
      chai.request(app)
        .get('/api/v1/questions/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a('array');
          res.body.data[0].should.be.a('object');
          done();
        });
    });
    it('GET /questions/:id should return a single question', (done) => {
      chai.request(app)
        .get('/api/v1/questions/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a('array');
          res.body.data[0].should.be.a('object');
          res.body.data[0].id.should.equal(1);
          done();
        });
    });
    
    describe('Error handling for question routes', () => {
      it('POST /questions/ without required data should return an error', (done) => {
        chai.request(app)
          .post('/api/v1/questions')
          .set('x-access-token', userToken)
          .send({})
          .end((err, res) => {
            res.should.have.status(400);
            res.body.error.should.be.a('string');
            done();
          });
      });
      describe('Multiple voting', () => {
        const upQuestionId = 1;
        const downQuestionId = 2;
        before((done)=> {
          chai.request(app)
            .patch(`/api/v1/questions/${upQuestionId}/upvote`)
            .set('x-access-token', userToken)
            .send({
              '_method': 'patch',
            })
            .end();

          chai.request(app)
            .patch(`/api/v1/questions/${downQuestionId}/downvote`)
            .set('x-access-token', userToken)
            .send({
              '_method': 'patch',
            })
            .end((err, res) => {
              done();
            });
        });
        it('Attempting multiple UPVOTE should return an error', (done) => {
          chai.request(app)
            .patch(`/api/v1/questions/${upQuestionId}/upvote`)
            .set('x-access-token', userToken)
            .send({
              '_method': 'patch',
            })
            .end((req, res) => {
              res.should.have.status(400);
              res.body.error.should.equal('multiple voting is not possible');
              done();
            });
        });
        it('Attempting multiple DOWNVOTE should return an error', (done) => {
          chai.request(app)
            .patch(`/api/v1/questions/${downQuestionId}/downvote`)
            .set('x-access-token', userToken)
            .send({
              '_method': 'patch',
            })
            .end((req, res) => {
              res.should.have.status(400);
              res.body.error.should.equal('multiple voting is not possible');
              done();
            });
        });
      });
    });
  });
}

export default questionTest;