import AuthModel from '../../Models/Auth';
import Response from '../../helpers/response';
import userHelper from '../../helpers/user';

const Auth = new AuthModel();
/**
 * @exports
 * @class AuthController
 */
class AuthController {
  /**
   * List all the resources on the table
   * @param {Object} req - request made
   * @param {Object} res - response to be given
   * @returns {Object} - response
   */
  static async list(req, res) {
    const records = await Auth.getAll();
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
    const resource = await Auth.getOne(id);

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

    req.body.isAdmin = false;

    try {
      const createdResource = await Auth.create(req.body);
      const token = userHelper.generateToken(createdResource.id, createdResource.email);
      return Response.created(res, [{ token, user: createdResource }]);
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
      const token = await Auth.login(req.body);
      const user = await Auth.findByAttribute({ email: req.body.email });
      return Response.success(res, [{ token, user }]);
    } catch (err) {
      return Response.customError(res, err.message, 400);
    }
  }

  /**
   * Delete A Auth
   * @param {object} req
   * @param {object} res
   * @returns {void} return status code 204
   */
  static async delete(req, res) {
    try {
      const result = await Auth.delete(Number(req.body.userId));
      if (result) {
        Response.deleted(req, res);
      }
    } catch (err) {
      return Response.customError(res, err.message, 400);
    }
  }
}

export default AuthController;
