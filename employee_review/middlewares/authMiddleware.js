import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
import dotenv from 'dotenv';

dotenv.config();

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token  === '' || token === undefined || token === null) {
    return res.status(401).json({
      status: 'error',
      message: 'Access token is missing or invalid',
    });
  }

  try {
    const user = await User.findOne({ where: { access_token : token  } });
    if (!user) {
    return  res.status(403).json({
        status: 'error',
        message: 'Access token has expired or is invalid',
      });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      req.user = { email: user.email, sessionId: decoded.sessionId, data : user  };
      next();
    });
  } catch (err) {
    next(err);
  }
};

export const checkRole = (role) => (req, res, next) => {
  if (role !== req.user.data.role) {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};