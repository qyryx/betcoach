import jwt from 'jsonwebtoken';
import {secret} from '../config.js';

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Authorization token missing' });
    }
    req.user = jwt.verify(token, secret);
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Unauthorized !' });
  }
};

export { verifyToken };