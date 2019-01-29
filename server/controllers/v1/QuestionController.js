import QuestionModel from '../../Models/Question';
import Response from '../../helpers/response';

const Question = new QuestionModel();

/**
 * @exports
 * @class QuestionController
 */
class QuestionController {
  /**
   * List all the resources on the table
   * @param {Object} req - request made
   * @param {Object} res - response to be given
   * @returns {Object} - response
   */
  static async list(req, res) {
    const records = await Question.getAll();
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
    const resource = await Question.getOne(id);

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
    const data = req.body;
    data.createdBy = req.user.id;

    try {
      const createdResource = await Question.create(data);
      return Response.created(res, [createdResource]);
    } catch (err) {
      return Response.customError(res, err.message, 400);
    }
  }

  /**
   *
   * @param {Object} req - request made
   * @param {Object} res - response to be returned
   * @returns {Object} - response object
   */
  static async upVote(req, res) {
    const questionId = Number(req.params.id);
    const userId = Number(req.user.id);

    try {
      const updatedResource = await Question.upVote(questionId, userId);
      return Response.success(res, updatedResource);
    } catch (err) {
      return Response.customError(res, err.message, 400);
    }
  }

  /**
   *
   * @param {Object} req - request made
   * @param {Object} res - response to be returned
   * @returns {Object} - response object
   */
  static async downVote(req, res) {
    const questionId = Number(req.params.id);
    const userId = Number(req.user.id);

    try {
      const updatedResource = await Question.downVote(questionId, userId);
      return Response.success(res, updatedResource);
    } catch (err) {
      return Response.customError(res, err.message, 400);
    }
  }
}

export default QuestionController;
