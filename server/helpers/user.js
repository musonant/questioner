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
    return bcrypt.compareSync(hashPassword, password);
  },

  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },

  generateToken(id) {
    const token = jwt.sign(
      { userId: id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    return token;
  }
};

export default userHelper;
