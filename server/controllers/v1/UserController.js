import UserModel from '../../Models/User';
import Response from '../../helpers/response';
import connection from '../../../db';
import userHelper from '../../helpers/user';

const User = new UserModel();
/**
 * @exports
 * @class UserController
 */
class UserController {
  /**
   * List all the resources on the table
   * @param {Object} req - request made
   * @param {Object} res - response to be given
   * @returns {Object} - response
   */
  static async list(req, res) {
    const records = await User.getAll();
    return Response.success(res, records);
  }

  /**
   * Retrieve a single resource from the table
   * @param {Object} req - request made
   * @param {Object} res - response to be given
   * @returns {Object} - response
   */
  static async retrieve(req, res) {
    const id = parseInt(req.params.id, 10);
    const resource = await User.getOne(id);

    if (!resource) {
      return Response.notFound(req, res);
    }
    return Response.success(res, resource);
  }

  /**
   * Create a resource
   * @param {Object} req - request made
   * @param {Object} res - response to be given
   * @returns {Object} - the response
   */
  static async create(req, res) {
    if (!req.body.email || !req.body.password) {
      return Response.customError(res, 'Some values are missing', 400);
    }
    if (!userHelper.isValidEmail(req.body.email)) {
      return Response.customError(res, 'Please enter a valid email address', 400);
    }

    try {
      const createdResource = await User.create(req.body);
      return Response.created(res, [createdResource]);
    } catch (err) {
      if (err.routine === '_bt_check_unique') {
        return Response.customError(res, 'This EMAIL has been registered by another user', 400);
      }
      return Response.customError(res, err.message, 400);
    }
  }

  /**
   * Login
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  static async login(req, res) {
    if (!req.body.email || !req.body.password) {
      return Response.customError(res, 'Some values are missing', 400);
    }
    if (!userHelper.isValidEmail(req.body.email)) {
      return Response.customError(res, 'Please enter a valid email address', 400);
    }

    try {
      const result = await User.login(req.body);
      return Response.success(res, result);
    } catch (err) {
      console.log(err);
      return Response.customError(res, err.message, 400);
    }
  }

  /**
   * Delete A User
   * @param {object} req
   * @param {object} res
   * @returns {void} return status code 204
   */
  static async delete(req, res) {
    try {
      const result = await User.delete(req.user.id);
      if (result) {
        Response.deleted(req, res);
      }
    } catch (err) {
      return res.status(400).send(err);
    }
  }
}

export default UserController;
