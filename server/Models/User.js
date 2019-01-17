import Model from './Model';
import connection from '../database/db';
import loginHelper from '../helpers/user';
import Response from '../helpers/response';
import userHelper from '../helpers/user';

/**
 * User class
 */
class User extends Model {
  /**
   * constructor
   * @param {String} table -
   */
  constructor(table = 'users') {
    super(table);
  }

  /**
   * Create a new resource
   * @param {Object} data - an object containing the properties for created resource
   * @returns {Object} - the new resource created
   */
  async create(data) {
    const hashedPassword = loginHelper.hashPassword(data.password);

    const text = `INSERT INTO
      users(firstname, lastname, othername, email, "phoneNumber", username, "isAdmin", password)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      returning *`;

    const values = [
      data.firstname,
      data.lastname,
      data.othername,
      data.email,
      data.phoneNumber,
      data.username,
      false,
      hashedPassword
    ];

    try {
      const { rows } = await connection.query(text, values);
      const token = loginHelper.generateToken(rows[0].id);
      return token;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  /**
   * login
   * @param {Array} data -
   * @returns {String} -token generated
   */
  async login(data) {
    const text = 'SELECT * FROM users WHERE email = $1';

    try {
      const { rows } = await connection.query(text, [data.email]);
      if (!rows[0]) {
        throw new Error('credenctials not found');
      }
      if (!userHelper.comparePassword(rows[0].password, data.password)) {
        throw new Error('Email or password incorrect');
      }
      const token = userHelper.generateToken(rows[0].id);
      return token;
    } catch (err) {
      throw err;
    }
  }

  async delete(userId) {
    const queryText = 'DELETE FROM users WHERE id=$1';
    
    try {
      const { rows } = await connection.query(queryText, [userId]);
      console.log(rows);
      
      if(!rows[0]) {
        throw new Error('user not found');
      }
      return true;
    } catch(err) {
      throw err;
    }
  }
}

export default User;
