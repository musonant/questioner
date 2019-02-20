import CommentModel from '../../Models/Comment';
import Response from '../../helpers/response';

const Comment = new CommentModel();

/**
 * CommentController
 */
class CommentController {
  /**
   * List all the resources on the table
   * @param {Object} req - request made
   * @param {Object} res - response to be given
   * @returns {Object} - response
   */
  static async list(req, res) {
    const records = await Comment.getAll();
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
    const resource = await Comment.getOne(id);

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
    let data = req.body;
    if (!data.questionId || !data.body) {
      return Response.customError(res, 'Please supply all required inputs');
    }

    data = {
      questionId: Number(req.body.questionId),
      body: req.body.body,
      createdBy: req.user.id
    };

    try {
      const createdResource = await Comment.create(data);
      return Response.created(res, [createdResource]);
    } catch (err) {
      return Response.customError(res, err.message);
    }
  }

  /**
   * Delete A Comment
   * @param {object} req
   * @param {object} res
   * @returns {void} return status code 204
   */
  static async delete(req, res) {
    try {
      const result = await Comment.delete(Number(req.params.id));
      if (result) {
        Response.deleted(res);
      }
    } catch (err) {
      return Response.customError(res, err.message);
    }
  }
}

export default CommentController;
