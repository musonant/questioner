/* eslint-disable */

import chai, { expect } from 'chai';
import Meetup from '../../Models/Meetup';

const meetupModelTests = () => {
  describe('Test cases for meetup model', () => {
    it('getAll() should return array of all meetups', (done) => {
      const result = Meetup.getAll();
      result.should.be.a('array');
      result[0].should.be.a('object');
      result[0].should.have.property('id');
      done();
    });
    it('getOne(id) should return a single meetup record', (done) => {
      const result = Meetup.getOne(1);
      result.should.be.a('object');
      result.should.have.property('id');
      result.id.should.equal(1);
      done();
    });
    it('getLastId() should return the id of the last meetup in record', (done) => {
      const result = Meetup.getLastId();
      result.should.be.a('number');
      done();
    });
    it('create(data) should create a meetup and return the new resource', (done) => {
      const result = Meetup.create({
        'topic': 'Some title',
        'createdBy': 1,
      });
      result.should.be.a('object');
      result.createdBy.should.equal(1);
      result.should.have.property('id');
      done();
    });
    it('listUpcoming() should return an array of upcoming meetup', (done) => {
      const result = Meetup.listUpcoming();
      result.should.be.a('array');
      done();
    });
    it('getTags(ref) should return array of tags associated with a meetup', (done) => {
      const result = Meetup.getTags([2, 3]);
      result.length.should.equal(2);
      result[0].should.have.property('id');
      result[0].id.should.equal(2);
      result[1].id.should.equal(3);
      done();
    });
    it('replyInvite(data) should create a new response to a meetup and return it', (done)=> {
      const result = Meetup.replyInvite({
        'meetup': 1,
        'user': 3,
        'response': 'yes',
      });
      result.should.be.a('object');
      result.should.have.property('id');
      result.meetup.should.equal(1);
      done();
    });
  });
  describe('Test cases for error handling', () => {
    it('Create(data) without required data should return an error', (done) => {
      try {
        const result = Meetup.create({});
      } catch (err) {
        expect(err.message.indexOf('Required')).to.not.equal(-1);
      }
      done();
    });
    it('replyInvite(data) without required data should return an error', (done) => {
      try {
        const result = Meetup.replyInvite({});
      } catch (err) {
        expect(err.message.indexOf('Required')).to.not.equal(-1);
      }
      done();
    });
  });
}

export default meetupModelTests;
