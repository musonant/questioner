import Meetup from '../../Models/Meetup';
import Response from '../../helpers/response';

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
  static list(req, res) {
    let records = [];
    if (req.query.scope === 'upcoming') {
      records = Meetup.listUpcoming();
    } else {
      records = Meetup.getAll();
    }

    const data = records.map((item) => {
      const tags = Meetup.getTags(item.tags);
      const resource = Object.assign({}, item);
      resource.tags = tags.map(tag => tag.name);
      return resource;
    });

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
    const resource = Meetup.getOne(id);

    if (!resource) {
      Response.notFound(req, res);
    } else {
      Response.success(res, resource);
    }
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
      const createdResource = Meetup.create(data);

      Response.created(res, [createdResource]);
    } catch (err) {
      Response.customError(res, err.message, 400);
    }
  }

  /**
   * Respond to a meetup invitation
   * @param {Object} req - request made
   * @param {Object} res - response to be given
   * @returns {Object} - response
   */
  static replyInvite(req, res) {
    const data = req.body;
    data.meetup = parseInt(req.params.id, 10);

    try {
      const createdResponse = Meetup.replyInvite(req.body);
      Response.created(res, [createdResponse]);
    } catch (err) {
      Response.customError(res, err.message, 400);
    }
  }
}

export default MeetupController;
