import connection from '../database/db';
import userHelper from '../helpers/user';

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
   * Create a new resource
   * @param {Object} data - an object containing the properties for created resource
   * @returns {Object} - the new resource created
   */
  async create(data) {
    const keys = Object.keys(data);
    const values = [];
    let fields = '';
    let placeholders = '';

    keys.forEach((key, i) => {
      if (key === 'password') {
        const hashedPassword = userHelper.hashPassword(data[key]);
        values.push(hashedPassword);
      } else if (key === 'tags') {
        const tags = [];
        const splitTags = data[key].split('');

        splitTags.forEach((item) => {
          const num = Number(item);
          if (!isNaN(num) && num !== 0) tags.push(item);
        });
        values.push(`{ ${tags} }`);
      } else {
        values.push(data[key]);
      }
      fields += i > 0 ? `, "${key}"` : `"${key}"`;
      placeholders += i > 0 ? `, $${i + 1}` : `$${i + 1}`;
    });

    const text = `INSERT INTO
      ${this.table} (${fields})
      VALUES (${placeholders})
      returning *`;

    try {
      const { rows } = await connection.query(text, values);
      return rows[0];
    } catch (err) {
      throw err;
    }
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
      throw err;
    }
  }

  /**
   * @param {String} whereString - the where string
   * @returns {Array} - array of questions
   */
  async getAllWhere(whereString) {
    try {
      const result = await connection.query(`SELECT * FROM ${this.table} WHERE ${whereString}`);
      return result.rows;
    } catch (err) {
      throw new Error(`Unexpected error: ${err.message}`);
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
      throw err;
    }
  }

  /**
   * Find a resource by a specified attribute
   * @param {Object} attribute - attribute to find resource by
   * @returns {Object} resource - the resource found
   */
  async findByAttribute(attribute) {
    let values = '';
    let props = '';
    const keys = Object.keys(attribute);
    keys.forEach((key, i) => {
      props += i === 0 ? `"${key}"` : `, "${key}"`;
      values += i === 0 ? `'${attribute[key]}'` : `, '${attribute[key]}'`;
    });

    try {
      const queryText = `SELECT * FROM ${this.table} WHERE ( ${props} ) = ( ${values} )`;
      const { rows } = await connection.query(queryText);
      return rows[0];
    } catch (err) {
      throw err;
    }
  }

  /**
   * @param {Number} id
   * @returns {Boolean} -
   */
  async delete(id) {
    const queryText = `DELETE FROM ${this.table} WHERE id=$1 returning *`;
    const singleItem = this.table.slice(0, -1);

    try {
      const { rows } = await connection.query(queryText, [id]);
      if (!rows[0]) {
        throw new Error(`${singleItem} not found`);
      }
      return true;
    } catch (err) {
      throw err;
    }
  }
}

export default Model;
