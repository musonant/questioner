import MeetupModel from '../../Models/Meetup';
import Response from '../../helpers/response';

const Meetup = new MeetupModel();
/**
 * @exports
 * @class MeetupController
 */
class MeetupController {
  /**
   * List all the resources on the table
   * @param {Object} req - request made
   * @param {Object} res - response to be given
   * @returns {Object} - response
   */
  static async list(req, res) {
    let records = [];
    if (req.query.scope === 'upcoming') {
      records = await Meetup.listUpcoming();
    } else {
      records = await Meetup.getAll();
    }

    records = await Meetup.attachTags(records);
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
    let resource = await Meetup.getOne(id);

    if (!resource) {
      return Response.notFound(req, res);
    }

    resource = await Meetup.attachTags([resource]);
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
      let resource = await Meetup.create(data);
      resource = await Meetup.attachTags([resource]);
      return Response.created(res, resource);
    } catch (err) {
      return Response.customError(res, err.message, 400);
    }
  }

  /**
   * Respond to a meetup invitation
   * @param {Object} req - request made
   * @param {Object} res - response to be given
   * @returns {Object} - response
   */
  static async replyInvite(req, res) {
    const data = { response: req.body.response };
    data.meetup = parseInt(req.params.id, 10);
    data.user = req.user.id;

    try {
      const createdResponse = await Meetup.replyInvite(data);
      return Response.created(res, [createdResponse]);
    } catch (err) {
      return Response.customError(res, err.message);
    }
  }

  /**
   * Add tags to a meetup
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} response object
   */
  static async addTags(req, res) {
    const { id } = req.params;

    let { tags } = req.body;
    if (typeof (tags) === 'string') {
      tags = JSON.parse(req.body.tags);
    }

    try {
      let resource = await Meetup.addTags(id, tags);
      resource = await Meetup.attachTags([resource]);
      return Response.success(res, [resource]);
    } catch (err) {
      return Response.customError(res, err.message);
    }
  }

  /**
   * Add images to a meetup
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} response object
   */
  static async addImages(req, res) {

  }

  /**
   * Delete a meetup record
   * @param {Object} req - request made
   * @param {Object} res - response to be returned
   * @returns {Object} - response
   */
  static async delete(req, res) {
    const id = Number(req.params.id);
    try {
      const result = await Meetup.delete(id);
      if (result) return Response.deleted(res);
    } catch (err) {
      return Response.customError(res, err.message);
    }
  }
}

export default MeetupController;
