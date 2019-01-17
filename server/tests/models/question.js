/* eslint-disable */

import chai, { expect } from 'chai';
import QuestionModel from '../../Models/Question';

const Question = QuestionModel;

const questionModelTests = () => {
  describe('Test cases for question model', () => {
    it('getAll() should return array of all questions', (done) => {
      const result = Question.getAll();
      result.should.be.a('array');
      result[0].should.be.a('object');
      result[0].should.have.property('id');
      done();
    });
    it('getOne(id) should return a single question record', (done) => {
      const result = Question.getOne(1);
      result.should.be.a('object');
      result.should.have.property('id');
      result.id.should.equal(1);
      done();
    });
    it('getLastId() should return the id of the last question in record', (done) => {
      const result = Question.getLastId();
      result.should.be.a('number');
      done();
    });
    it('create(data) should create a question and return the new resource', (done) => {
      const result = Question.create({
        'createdBy': 2,
        'meetup': 1,
        'authorName': 'James Jones',
        'body': 'What are the applications of asynchronous operations?',
      });
      result.should.be.a('object');
      result.createdBy.should.equal(2);
      result.meetup.should.equal(1);
      result.should.have.property('id');
      done();
    });
    it('upVote(questionId, userId) should upvote a question and return the upvoted question', (done) => {
      const result = Question.upVote(1, 2);
      result.should.be.a('object');
      result.should.have.property('id');
      result.id.should.equal(1);
      result.upVoters.length.should.be.greaterThan(0);
      done();
    });
    it('downVote(questionId, userId) should downvote a question and return the downvoted question', (done) => {
      const result = Question.downVote(1, 2);
      result.should.be.a('object');
      result.should.have.property('id');
      result.id.should.equal(1);
      done();
    });
    it('removeVote(voters, userId) should remove a voter from a list of votes', (done) => {
      const result = Question.removeVote([2,3,5], 3);
      result.should.be.a('array');
      result.should.deep.equal([2,5]);
      done();
    });
  });
  describe('Error handling for Question model', () => {
    it('Create(data) without required data should return an error', (done) => {
      try {
        const result = Question.create({});
      } catch (err) {
        expect(err.message.indexOf('Required')).to.not.equal(-1);
      }
      done();
    });
    describe('Error testing for upVote method', () => {
      const userId = 2;
      let question;
      before(() => {
        question = Question.create({
          'createdBy': 2,
          'meetup': 1,
          'authorName': 'James Jones',
          'body': 'What are the applications of asynchronous operations?',
        });
        let result = Question.upVote(question.id, userId);
      })
      it('Multiple upvoting should return an error', (done) => {
        try {
          let result = Question.upVote(question.id, userId);
        } catch (err) {
          expect(err.message).to.equal('multiple voting is not possible');
        }
        done();
      });
    });
    describe('Error testing for downVote method', () => {
      const userId = 2;
      let question;
      before(() => {
        question = Question.create({
          'createdBy': 2,
          'meetup': 1,
          'authorName': 'James Jones',
          'body': 'What are the applications of asynchronous operations?',
        });
        let result = Question.downVote(question.id, userId);
      })
      it('Multiple upvoting should return an error', (done) => {
        try {
          let result = Question.downVote(question.id, userId);
        } catch (err) {
          expect(err.message).to.equal('multiple voting is not possible');
        }
        done();
      });
    });
    
  });
}

export default questionModelTests;
