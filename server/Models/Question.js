import question, { defaultRecord } from '../database/questions';

/**
 * This is model of a resource
 * in the app typical of a database table
 *
 * @export
 * @class Model
 */
class Question {
  /**
   * @returns {Array} - An array of all records for the resource
   */
  static getAll() {
    return question;
  }

  /**
   * Function to get a single resource with the given id
   * @param {Number} id - the primary key of the resource to be found
   * @returns {Object} - the resource with the specified id
   */
  static getOne(id) {
    return question.find(item => item.id === id);
  }

  /**
   * Get the id of the last resource on the table
   * @returns {Number} - the id of the last item on the record/table
   */
  static getLastId() {
    return question[(question.length - 1)].id;
  }

  /**
   * Create a new resource
   * @param {Array} data - an array of the properties for created resource
   * @returns {Object} - the new resource created
   */
  static create(data) {
    const lastId = Question.getLastId();

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
}

export default Question;
