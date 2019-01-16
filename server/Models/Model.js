import connection from '../../db';

/**
 * This is model of a resource
 * in the app typical of a database table
 *
 * @export
 * @class Model
 */
class Model {
  /**
   * @param {string} table - table name in database
   */
  constructor(table) {
    this.table = table;
  }

  /**
   * @returns {Array} - An array of all records for the resource
   */
  async getAll() {
    const queryText = `SELECT * FROM ${this.table}`;
    try {
      const result = await connection.query(queryText);
      return result.rows;
    } catch (err) {
      console.log(err.stack);
      return err.stack;
    }
  }

  /**
   * Function to get a single resource with the given id
   * @param {Number} id - the primary key of the resource to be found
   * @returns {Object} - the resource with the specified id
   */
  async getOne(id) {
    const queryText = `SELECT * FROM ${this.table} WHERE id = ${id}`;
    try {
      const result = await connection.query(queryText);
      return result.rows[0];
    } catch (err) {
      console.log(err.stack);
      return err.stack;
    }
  }
}

export default Model;
