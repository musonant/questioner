import Meetup from '../../Models/Meetup';

class meetupController {
  static list(req, res) {
    let data = Meetup.getAll();
    res.status(200).send({
      status: 200,
      data,
    });
  }

  static retrieve(req, res) {
    const id = parseInt(req.params.id, 10);
    const resource = Meetup.getOne(id);
    res.status(200).send({
      status: 200,
      data: resource,
    });
  }
}

export default meetupController;
