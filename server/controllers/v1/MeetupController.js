import Joi from 'joi';
import MeetupModel from '../../Models/Meetup';
import Response from '../../helpers/response';
import uploadFile from '../../helpers/fileUpload';

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
    const meetupSchema = Joi.object().keys({
      location: Joi.string(),
      topic: Joi.string(),
      happeningOn: Joi.string(),
      tags: Joi.array().items(Joi.number()),
      description: Joi.string()
    });

    let validData = Joi.validate(req.body, meetupSchema)
      .catch((validationError) => {
        const errMsg = validationError.details.map(d => d.message);
        return Response.customError(res, errMsg);
      });

    // validData = Promise.all(validData);
    // console.log('valid data: ', validData);
    // meetupSchema.validate(req.body, );

    const upload = uploadFile.single('featured-image');
    upload(req, res, async () => {
      const data = req.body;
      data.createdBy = req.user.id;

      if (req.file) {
        data.images = [req.file.path];
      }
      try {
        let resource = await Meetup.create(data);
        resource = await Meetup.attachTags([resource]);
        return Response.created(res, resource);
      } catch (err) {
        return Response.customError(res, err.message);
      }
    });
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
    const tags = [];
    const splitTags = req.body.tags.split('');

    splitTags.forEach((item) => {
      const num = Number(item);
      if (!isNaN(num) && num !== 0) tags.push(item);
    });

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
