import connection from '../database/db';
import Model from './Model';

/**
 * This is model of a resource
 * in the app typical of a database table
 *
 * @export
 * @class Model
 */
class Meetup extends Model {
  /**
   * constructor
   * @param {string} table - name of database table
   */
  constructor(
    table = 'meetups'
  ) {
    super(table);
  }

  /**
   * Get the meetups scheduled by a specified user
   * @param {Number} userId - the id of the user who made scheduled
   * @returns {Array} - array of meetups scheduled by the user
   */
  async listScheduledMeetups(userId) {
    const queryText = `SELECT * FROM rsvps WHERE rsvps.user = ${userId}`;
    const { rows } = await connection.query(queryText);

    const promisedMeetups = rows.map(response => this.getOne(response.meetupId));
    const meetups = await Promise.all(promisedMeetups);

    return meetups;
  }


  /**
   * Get all upcoming meetups
   * @returns {Array} - array of all upcoming meetups
   */
  async listUpcoming() {
    const allResources = await this.getAll();
    const currentTimestamp = Date.now();
    const upcoming = [];

    allResources.forEach((resource) => {
      const timestamp = new Date(resource.happeningOn);
      if (currentTimestamp < timestamp.getTime()) {
        upcoming.push(resource);
      }
    });

    return upcoming;
  }

  /**
   * Attach tags associated with a meetup
   * @param {Array} meetups - and array of meetups
   * @returns {Array} - and array of meetups with the tags attached
   */
  async attachTags(meetups) {
    const tagsQuery = await connection.query('SELECT * FROM tags');
    const actualTags = tagsQuery.rows;

    meetups.forEach((meetup) => {
      const { tags } = meetup;
      const tagResult = [];
      if (tags !== null) {
        tags.forEach((tagId) => {
          const singleTag = actualTags.find(tag => tag.id === Number(tagId));
          if (singleTag !== undefined) {
            tagResult.push(singleTag);
          }
        });
      }

      meetup.tags = tagResult;
    });

    return meetups;
  }

  /**
   * Attach author object to meetup
   * @param {Array} meetups - Array of meetups
   * @returns {Array} - Array of meetups incuding their author object
   */
  async attachAuthor(meetups) {
    const records = meetups.map(async (meetup) => {
      const { rows } = await connection.query(`SELECT * FROM users WHERE users.id = ${meetup.createdBy}`);
      // eslint-disable-next-line prefer-destructuring
      meetup.author = rows[0];
      return meetup;
    });

    const meetupsList = await Promise.all(records);
    return meetupsList;
  }

  /**
   * Respond to a meetup invitation
   * @param {Array} data - an array of the properties
   * @returns {Object} - created resource
   */
  async replyInvite(data) {
    const text = `INSERT INTO
      rsvps("meetupId", "user", "response")
      VALUES ($1, $2, $3)
      returning *`;

    const values = [
      Number(data.meetupId),
      Number(data.user),
      data.response,
    ];

    try {
      const { rows } = await connection.query(text, values);
      return rows[0];
    } catch (err) {
      throw err;
    }
  }

  /**
   * Add tags to a meetup
   * @param {Number} id - the id of the specified meetup
   * @param {Array} tags - an array of tags
   * @returns {Object} - updated resource
   */
  async addTags(id, tags) {
    const meetup = await this.getOne(id);

    if (!meetup) throw new Error('Required meetup does not exist');

    const queryText = `UPDATE meetups SET tags = '{ ${tags} }' WHERE id = ${meetup.id} returning *`;
    try {
      const { rows } = await connection.query(queryText);
      return rows[0];
    } catch (err) {
      throw err;
    }
  }
}

export default Meetup;
