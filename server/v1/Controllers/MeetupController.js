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
      const tags = Meetup.getFieldRelations(item.tags);
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
    res.status(200).send({
      status: 200,
      data: resource,
    });
  }
}

export default MeetupController;