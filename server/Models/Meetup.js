import connection from '../../db';
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
   * Create a new resource
   * @param {Object} data - an object containing the properties for created resource
   * @returns {Object} - the new resource created
   */
  async create(data) {
    const text = `INSERT INTO
      meetups("createdBy", location, images, topic, "happeningOn", tags, description)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      returning *`;

    const values = [
      Number(data.createdBy),
      data.location,
      data.images,
      data.topic,
      data.happeningOn,
      data.tags,
      data.descriptions
    ];

    try {
      const { rows } = await connection.query(text, values);
      return rows[0];
    } catch (err) {
      throw err;
    }
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
   * Find a list of resources that are connected to another record
   * to attach the actual data to the record
   * @param {Array} ref - array of the primary keys (id) of the linked resource
   * @returns {Array} - and array of the actual resources found by their keys
   */
  async getTags(ref) {
    const data = [];
    const queryText = 'SELECT * FROM tags';
    let tagsResult = [];
    try {
      tagsResult = await connection.query(queryText);
    } catch (err) {
      console.log(err.stack);
    }

    await ref.forEach((id) => {
      const resource = tagsResult.rows.find(tag => tag.id === Number(id));
      data.push(resource);
    });

    return data;
  }

  /**
   * Respond to a meetup invitation
   * @param {Array} data - an array of the properties
   * @returns {Object} - created resource
   */
  async replyInvite(data) {
    const text = `INSERT INTO
      rsvps("meetup", "user", "response")
      VALUES ($1, $2, $3)
      returning *`;

    const values = [
      Number(data.meetup),
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
}

export default Meetup;
