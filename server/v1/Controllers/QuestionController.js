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
}

export default QuestionController;
