const Response = {
  badRequest: (err, res) => {
    res.status(400).send({
      status: 400,
      error: 'bad or incorrect request',
    });
  },

  deleted: (req, res) => {
    res.status(204).send({
      status: 204,
      error: 'deleted',
    });
  },

  invalidParams: (err, res) => {
    res.status(400).send({
      status: 400,
      error: 'parameters are invalid',
    });
  },

  notFound: (err, res) => {
    res.status(404).send({
      status: 404,
      error: 'Not found',
    });
  },

  created: (res, data) => {
    res.status(201).send({
      status: 201,
      data
    });
  },

  success: (res, data) => {
    res.status(200).send({
      status: 200,
      data
    });
  },

  customError: (res, error, status) => {
    res.status(status).send({
      status,
      error
    });
  },

  incorrectCred: (res, error) => {
    res.status(400).send({
      status: 400,
      error
    });
  },

  invalidToken: (req, res) => {
    res.status(400).send({
      status: 400,
      error: 'Invalid token'
    });
  }
};

export default Response;
