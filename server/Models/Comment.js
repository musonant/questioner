import Model from './Model';
// import connection from '../database/db';
// import userHelper from '../helpers/user';

/**
 * User class
 */
class User extends Model {
  /**
   * constructor
   * @param {String} table -
   */
  constructor(table = 'comments') {
    super(table);
  }
}

export default User;
