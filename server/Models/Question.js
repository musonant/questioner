import questions, { defaultRecord } from '../database/questions';

/**
 * This is model of a resource
 * in the app typical of a database table
 *
 * @export
 * @class Model
 */
class Question {
  /**
   * @returns {Array} - An array of all records for the resource
   */
  static getAll() {
    return questions;
  }

  /**
   * Function to get a single resource with the given id
   * @param {Number} id - the primary key of the resource to be found
   * @returns {Object} - the resource with the specified id
   */
  static getOne(id) {
    return questions.find(item => item.id === id);
  }

  /**
   * Get the id of the last resource on the table
   * @returns {Number} - the id of the last item on the record/table
   */
  static getLastId() {
    return questions[(questions.length - 1)].id;
  }

  /**
   * Create a new resource
   * @param {Array} data - an array of the properties for created resource
   * @returns {Object} - the new resource created
   */
  static create(data) {
    const lastId = Question.getLastId();

    const fields = Object.keys(defaultRecord);
    const newResource = { id: (lastId + 1) };
    fields.forEach((field) => {
      if (field !== 'id') {
        newResource[field] = field === 'createdOn' ? new Date() : data[field] || defaultRecord[field];
      }

      // Verify that all required fields have been provided
      if (newResource[field] === undefined) {
        throw new Error(`Required field, ${field} not provided`);
      }
    });

    questions.push(newResource);
    return newResource;
  }

  /**
   *
   * @param {Object} questionId -
   * @param {Object} userId -
   * @returns {Object} - updated question object
   */
  static upVote(questionId, userId) {
    const specifiedQuestion = Question.getOne(questionId);
    const { upVoteStatus, downVoteStatus } = Question.voteExists(questionId, userId);

    if (upVoteStatus === true) {
      throw new Error('multiple voting is not possible');
    }
    if (downVoteStatus === true) {
      specifiedQuestion.downVoters = Question.removeVote(specifiedQuestion.downVoters, userId);
    }

    specifiedQuestion.upVoters.push(userId);
    return specifiedQuestion;
  }

  /**
   *
   * @param {Object} questionId -
   * @param {Object} userId -
   * @returns {Object} - updated questions object
   */
  static downVote(questionId, userId) {
    const specifiedQuestion = Question.getOne(questionId);
    const { upVoteStatus, downVoteStatus } = Question.voteExists(questionId, userId);

    if (downVoteStatus === true) {
      throw new Error('multiple voting is not possible');
    }
    if (upVoteStatus === true) {
      specifiedQuestion.upVoters = Question.removeVote(specifiedQuestion.upVoters, userId);
    }

    specifiedQuestion.downVoters.push(userId);
    return specifiedQuestion;
  }

  /**
   * Remove specified voter from an array of voters
   * @param {Array} voters -
   * @param {Number} userId -
   * @returns {Array} - modified array of voters
   */
  static removeVote(voters, userId) {
    return voters.filter(item => item !== userId);
  }

  /**
   *
   * @param {Object} questionId -
   * @param {Object} userId -
   * @returns {Boolean} -
   */
  static voteExists(questionId, userId) {
    const specifiedQuestion = Question.getOne(questionId);
    let upVoteStatus = false;
    let downVoteStatus = false;

    specifiedQuestion.upVoters.forEach((item) => {
      if (userId === item) {
        upVoteStatus = true;
      }
    });

    specifiedQuestion.downVoters.forEach((item) => {
      if (userId === item) {
        downVoteStatus = true;
      }
    });

    return {
      upVoteStatus,
      downVoteStatus
    };
  }
}

export default Question;