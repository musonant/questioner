import Response from '../helpers/response';

const reqParams = (req, res, next) => {
  const keys = Object.keys(req.params);

  for (const key of keys) {
    if (key.indexOf('id') !== -1) {
      const id = Number(req.params.id);

      if (id <= 0 || isNaN(id)) {
        return Response.invalidParams(req, res);
      }
      next();
    }
  }
};

export default reqParams;
