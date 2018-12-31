import Meetup from '../../Models/Meetup';

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
    const resource = Meetup.getOne(id);

    if (id <= 0 || isNaN(id)) {
      return res.status(400).send({
        status: 400,
        error: 'Bad or incorrect request',
      });
    }

    if (!resource) {
      res.status(404).send({
        status: 404,
        error: 'Not found',
      });
    } else {
      res.status(200).send({
        status: 200,
        data: resource,
      });
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
      res.status(201).send({
        status: 201,
        data: [createdResponse],
      });
    } catch (err) {
      res.status(400).send({
        status: 400,
        error: err.message,
      });
    }
  }
}

export default MeetupController;
