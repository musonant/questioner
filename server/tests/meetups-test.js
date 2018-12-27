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
  });
}

export default testMeetup;