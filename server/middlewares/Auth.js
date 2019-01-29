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
    const token = req.headers['x-access-token'] || req.query.token;

    if (!token) {
      return Response.customError(res, 'Token is not provided', 400);
    }
    try {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      const text = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await connection.query(text, [decoded.id]);
      if (!rows[0]) {
        return Response.invalidToken(req, res);
      }

      req.user = { id: decoded.id };
      next();
    } catch (err) {
      return Response.customError(res, err, 400);
    }
  },

  async isAdmin(req, res, next) {
    const { id } = req.user;

    try {
      const text = `SELECT * FROM users WHERE id = ${id}`;
      const { rows } = await connection.query(text);
      if (rows[0].isAdmin === false) {
        return Response.unAuthorised(res);
      }
      next();
    } catch (err) {
      return Response.customError(res, err, 400);
    }
  }
};

export default Auth;
