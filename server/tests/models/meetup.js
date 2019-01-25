/* eslint-disable */

import chai, { expect } from 'chai';
import MeetupModel from '../../Models/Meetup';

const Meetup = new MeetupModel;

const meetupModelTests = () => {
  describe('Test cases for meetup model', () => {
    it('getAll() should return array of all meetups', (done) => {
      Meetup.getAll().then(result => {
        result.should.be.a('array');
        result[0].should.be.a('object');
        result[0].should.have.property('id');
        done();
      }).catch(err => {
        done(err)
      })
    });
    it('getOne(id) should return a single meetup record', (done) => {
      Meetup.getOne(1).then(result => {
        result.should.be.a('object');
        result.should.have.property('id');
        result.id.should.equal(1);
        done();
      }).catch (err => {
        done(err);
      })
    });
    it('getLastId() should return the id of the last meetup in record', (done) => {
      Meetup.getLastId().then(result => {
        result.should.be.a('number');
        done();
      }).catch (err => {
        done(err);
      });
    });
    it('create(data) should create a meetup and return the new resource', (done) => {
      Meetup.create({
        'topic': 'Some title',
        'createdBy': 1,
      }).then(result => {
        result.should.be.a('object');
        result.createdBy.should.equal(1);
        result.should.have.property('id');
        done();
      }).catch(err => {
        done(err);
      })
    });
    it('listUpcoming() should return an array of upcoming meetup', (done) => {
      Meetup.listUpcoming().then(result => {
        result.should.be.a('array');
        done();
      }).catch(err => {
        done(err);
      });
    });
    it('getTags(ref) should return array of tags associated with a meetup', (done) => {
      Meetup.getTags([2, 3]).then(result => {
        result.length.should.equal(2);
        result[0].should.have.property('id');
        result[0].id.should.equal(2);
        result[1].id.should.equal(3);
        done();
      }).catch(err => {
        done(err);
      });
    });
    it('replyInvite(data) should create a new response to a meetup and return it', (done)=> {
      Meetup.replyInvite({
        'meetup': 1,
        'user': 3,
        'response': 'yes',
      }).then(result => {
        result.should.be.a('object');
        result.should.have.property('id');
        result.meetup.should.equal(1);
        done();
      }).catch(err => {
        done(err);
      });
    });
  });
  describe('Test cases for error handling', () => {
    it('Create(data) without required data should return an error', (done) => {
      try {
        Meetup.create({});
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
