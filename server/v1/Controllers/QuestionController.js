import Question from '../../Models/Question';

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

    res.status(200).send({
      status: 200,
      data,
    });
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
    res.status(200).send({
      status: 200,
      data: resource,
    });
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

      res.status(201).send({
        status: 201,
        data: [createdResource],
      });
    } catch (err) {
      res.status(400).send({
        status: 400,
        error: err.message,
      });
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

    try {
      const updatedResource = Question.upVote(questionId, userId);

      res.status(200).send({
        status: 200,
        data: [updatedResource],
      });
    } catch (err) {
      res.status(400).send({
        status: 400,
        error: err.message,
      });
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

    try {
      const updatedResource = Question.downVote(questionId, userId);

      res.status(200).send({
        status: 200,
        data: [updatedResource],
      });
    } catch (err) {
      res.status(400).send({
        status: 400,
        error: err.message,
      });
    }
  }
}

export default QuestionController;
