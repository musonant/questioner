import Model from './Model';
import connection from '../database/db';
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
}

export default User;
