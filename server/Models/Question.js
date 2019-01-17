import Model from './Model';
import connection from '../database/db';
import questions, { defaultRecord } from '../database/questions';

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
   * Create a new resource
   * @param {Object} data - an object containing the properties for created resource
   * @returns {Object} - the new resource created
   */
  async create(data) {
    const text = `INSERT INTO
      questions("createdBy", meetup, title, body)
      VALUES ($1, $2, $3, $4)
      returning *`;

    const values = [
      Number(data.createdBy),
      Number(data.meetup),
      data.title,
      data.body,
    ];

    try {
      const { rows } = await connection.query(text, values);
      return rows[0];
    } catch (err) {
      throw err;
    }
  }

  /**
   *
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

    const result = await connection.query(`UPDATE questions SET "upVoters"='${preparedUpVoters}', "downVoters"='${preparedDownVoters}' WHERE id=${questionId}`, (err) => {
      if (err) {
        // throw new Error('Unexpected error:', err);
      }
    });
    return result;
  }

  /**
   * Remove specified voter from an array of voters
   * @param {Array} voters -
   * @param {Number} userId -
   * @returns {Array} - modified array of voters
   */
  addVote(voters, userId) {
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
    const downVoters = this.addVote(question.upVoters, userId);
    const preparedDownVoters = this.prepareVoteText(downVoters);
    const preparedUpVoters = this.prepareVoteText(upVoters);

    const result = await connection.query(`UPDATE questions SET "upVoters"='${preparedDownVoters}', "downVoters"='${preparedUpVoters}' WHERE id=${questionId}`);
    return result;
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
    const array = [...voters];
    array.filter(item => item !== userId);
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

    question.upVoters = question.upVoters || [];
    question.downVoters = question.upVoters || [];

    question.upVoters.forEach((item) => {
      if (userId === Number(item)) {
        upVoteStatus = true;
      }
    });

    question.downVoters.forEach((item) => {
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
