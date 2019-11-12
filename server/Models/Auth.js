import Model from './Model';
import connection from '../database/db';
import userHelper from '../helpers/user';

/**
 * User class
 */
class Auth extends Model {
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
      const { rows: [user] } = await connection.query(text, [data.email]);
      if (!user) {
        throw new Error('credentials not found');
      }
      if (!userHelper.comparePassword(user.password, data.password)) {
        throw new Error('Email or password incorrect');
      }
      delete user.password;
      const token = userHelper.generateToken(user.id, user.email);
      return { token, user };
    } catch (err) {
      throw err;
    }
  }
}

export default Auth;
