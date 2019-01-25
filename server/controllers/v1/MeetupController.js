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

    const addTags = async (tags) => {
      if (tags) {
        await Meetup.getTags(tags);
      }
    };

    records.forEach((item) => {
      item.tags = addTags(item.tags);
    });

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
    const resource = await Meetup.getOne(id);

    if (!resource) {
      return Response.notFound(req, res);
    }
    return Response.success(res, [resource]);
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
      const createdResource = await Meetup.create(data);
      return Response.created(res, [createdResource]);
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
      return Response.customError(res, err.message, 400);
    }
  }
}

export default MeetupController;
