import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();
const saltRounds = 10;

const userHelper = {
  hashPassword(password) {
    return bcrypt.hashSync(password, saltRounds);
  },

  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },

  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },

  generateToken(id, email) {
    const payload = {
      id,
      email
    };
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '2d' }
    );
    return token;
  }
};

export default userHelper;
