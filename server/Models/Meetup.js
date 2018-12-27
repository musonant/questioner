import meetup, { defaultRecord } from '../database/meetups';
import tags from '../database/tags';
import rsvps, { rsvpSchema } from '../database/rsvps';

/**
 * This is model of a resource
 * in the app typical of a database table
 *
 * @export
 * @class Model
 */
class Meetup {
  /**
   * @returns {Array} - An array of all records for the resource
   */
  static getAll() {
    return meetup;
  }

  /**
   * Function to get a single resource with the given id
   * @param {Number} id - the primary key of the resource to be found
   * @returns {Object} - the resource with the specified id
   */
  static getOne(id) {
    return meetup.find(item => item.id === id);
  }

  /**
   * Get the id of the last resource on the table
   * @returns {Number} - the id of the last item on the record/table
   */
  static getLastId() {
    return meetup[(meetup.length - 1)].id;
  }

  /**
   * Create a new resource
   * @param {Array} data - an array of the properties for created resource
   * @returns {Object} - the new resource created
   */
  static create(data) {
    const lastId = Meetup.getLastId();

    const fields = Object.keys(defaultRecord);
    const newResource = { id: (lastId + 1) };
    fields.forEach((field) => {
      if (field !== 'id') {
        newResource[field] = field === 'createdOn' ? new Date() : data[field] || defaultRecord[field];
      }

      // Verify that all required fields have been provided
      if (newResource[field] === undefined) {
        throw new Error(`Required field, ${field} not provided`);
      }
    });

    return newResource;
  }

  /**
   * Get all upcoming meetups
   * @returns {Array} - array of all upcoming meetups
   */
  static listUpcoming() {
    const allResources = Meetup.getAll();
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
   * @param {Array} rel - array of the primary keys (id) of the linked resource
   * @returns {Array} - and array of the actual resources found by their keys
   */
  static getFieldRelations(rel) {
    const data = [];
    rel.forEach((id) => {
      const resource = tags.find(tag => tag.id === id);
      data.push(resource);
    });

    return data;
  }

  /**
   * Respond to a meetup invitation
   * @param {Array} data - an array of the properties
   * @returns {Object} - created resource
   */
  static replyInvite(data) {
    const lastId = rsvps[rsvps.length - 1].id;
    const newResource = { id: lastId + 1, };
    const fields = Object.keys(rsvpSchema);

    fields.forEach((field) => {
      if (field !== 'id') {
        newResource[field] = data[field];
      }

      // Verify that all required fields have been provided
      if (newResource[field] === undefined) {
        throw new Error(`Required field, ${field} not provided`);
      }
    });

    return newResource;
  }
}

export default Meetup;
