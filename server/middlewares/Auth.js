import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import connection from '../database/db';
import Response from '../helpers/response';

dotenv.config();

const Auth = {

  /**
  * Verify Token
  * @param {object} req
  * @param {object} res
  * @param {object} next
  * @returns {object|void} response object
  */

  async verifyToken(req, res, next) {
    process.env.SECRET = 'RWeV4amcLR7d8bLGrDQ3';

    const token = req.headers['x-access-token'];

    if (!token) {
      return Response.customError(res, 'Token is not provided', 400);
    }
    console.log(process.env.SECRET);
    try {
      const decoded = await jwt.verify(token, process.env.SECRET);
      const text = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await connection.query(text, [decoded.userId]);
      if (!rows[0]) {
        return Response.invalidToken(req, res);
      }

      req.user = { id: decoded.userId };
      next();
    } catch (err) {
      return Response.customError(res, err, 400);
    }
  }


};

export default Auth;
