import Model from './Model';
import connection from '../database/db';

/**
 * This is model of a resource
 * in the app typical of a database table
 *
 * @export
 * @class Model
 */
class Question extends Model {
  /**
   * constructor
   * @param {string} table - name of database table
   */
  constructor(
    table = 'questions'
  ) {
    super(table);
  }

  /**
   * @param {Object} questionId -
   * @param {Object} userId -
   * @returns {Object} - updated question object
   */
  async upVote(questionId, userId) {
    let downVoters = [];
    const question = await this.getOne(questionId);

    const { upVoteStatus, downVoteStatus } = this.voteExists(question, userId);

    if (upVoteStatus === true) {
      throw new Error('multiple voting is not possible');
    }
    if (downVoteStatus === true) {
      downVoters = this.removeVote(question.downVoters, userId);
    }
    const upVoters = this.addVote(question.upVoters, userId);
    const preparedUpVoters = this.prepareVoteText(upVoters);
    const preparedDownVoters = this.prepareVoteText(downVoters);

    try {
      const result = await connection.query(`UPDATE questions SET "upVoters"='${preparedUpVoters}', "downVoters"='${preparedDownVoters}' WHERE id=${questionId} returning *`);
      return result.rows;
    } catch (err) {
      throw new Error('Unexpected error:', err);
    }
  }

  /**
   * Remove specified voter from an array of voters
   * @param {Array} voters -
   * @param {Number} userId -
   * @returns {Array} - modified array of voters
   */
  addVote(voters, userId) {
    voters = voters === null ? [] : voters;
    const array = [...voters];
    array.push(userId);
    return array;
  }

  /**
   *
   * @param {Object} questionId -
   * @param {Object} userId -
   * @returns {Object} - updated questions object
   */
  async downVote(questionId, userId) {
    let upVoters = [];
    const question = await this.getOne(questionId);
    const { upVoteStatus, downVoteStatus } = this.voteExists(question, userId);

    if (downVoteStatus === true) {
      throw new Error('multiple voting is not possible');
    }
    if (upVoteStatus === true) {
      upVoters = this.removeVote(question.upVoters, userId);
    }
    const downVoters = this.addVote(question.downVoters, userId);

    const preparedDownVoters = this.prepareVoteText(downVoters);
    const preparedUpVoters = this.prepareVoteText(upVoters);

    try {
      const result = await connection.query(`UPDATE questions SET "upVoters"='${preparedUpVoters}', "downVoters"='${preparedDownVoters}' WHERE id=${questionId} returning *`);
      return result.rows;
    } catch (err) {
      throw new Error('Unexpected error:', err);
    }
  }

  /**
   * Prepare voters array for query
   * @param {Array} voters - Array of voters
   * @returns {String} preparedVoters - string ready for query
   */
  prepareVoteText(voters) {
    let preparedVoters = '{';
    for (let i = 0; i < voters.length; i++) {
      const num = voters[i];
      preparedVoters += i > 0 ? `, ${num}` : `${num}`;
    }
    preparedVoters += '}';

    return preparedVoters;
  }

  /**
   * Remove specified voter from an array of voters
   * @param {Array} voters -
   * @param {Number} userId -
   * @returns {Array} - modified array of voters
   */
  removeVote(voters, userId) {
    let array = [...voters];
    array = array.filter(item => Number(item) !== userId);
    return array;
  }

  /**
   *
   * @param {Object} question -
   * @param {Object} userId -
   * @returns {Boolean} -
   */
  voteExists(question, userId) {
    let upVoteStatus = false;
    let downVoteStatus = false;

    const upVoters = question.upVoters || [];
    const downVoters = question.downVoters || [];

    upVoters.forEach((item) => {
      if (userId === Number(item)) {
        upVoteStatus = true;
      }
    });

    downVoters.forEach((item) => {
      if (userId === Number(item)) {
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
