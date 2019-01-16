import Question from '../../Models/Question';
import Response from '../../helpers/response';

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
  static list(req, res) {
    const data = Question.getAll();
    Response.success(res, data);
  }

  /**
   * Retrieve a single resource from the table
   * @param {Object} req - request made
   * @param {Object} res - response to be given
   * @returns {Object} - response
   */
  static retrieve(req, res) {
    const id = parseInt(req.params.id, 10);
    const resource = Question.getOne(id);
    Response.success(res, resource);
  }

  /**
   * Create a resource
   * @param {Object} req - request made
   * @param {Object} res - response to be given
   * @returns {Object} - the response
   */
  static create(req, res) {
    const data = req.body;
    try {
      const createdResource = Question.create(data);
      Response.created(res, [createdResource]);
    } catch (err) {
      Response.customError(res, err.message, 400);
    }
  }

  /**
   *
   * @param {Object} req - request made
   * @param {Object} res - response to be returned
   * @returns {Object} - response object
   */
  static upVote(req, res) {
    const questionId = Number(req.params.id);
    const userId = Number(req.body.userId);

    if (!req.body.userId) {
      return Response.customError(res, 'No user id provided', 400);
    }

    try {
      const updatedResource = Question.upVote(questionId, userId);
      Response.success(res, [updatedResource]);
    } catch (err) {
      Response.customError(res, err.message, 400);
    }
  }

  /**
   *
   * @param {Object} req - request made
   * @param {Object} res - response to be returned
   * @returns {Object} - response object
   */
  static downVote(req, res) {
    const questionId = Number(req.params.id);
    const userId = Number(req.body.userId);

    if (!req.body.userId) {
      return Response.customError(res, 'No user id provided', 400);
    }

    try {
      const updatedResource = Question.downVote(questionId, userId);
      Response.success(res, [updatedResource]);
    } catch (err) {
      Response.customError(res, err.message, 400);
    }
  }
}

export default QuestionController;
