import Question from '../../Models/Question';

/**
 * @exports
 * @class QuestionController
 */
class QuestionController {
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
}

export default QuestionController;
