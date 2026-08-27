import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  // Token format: "Bearer <token>"
  const token = authorization.split(' ')[1];

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET || 'supersecretportfoliojwtkey123!');
    req.user = await User.findOne({ _id }).select('_id role');
    if (!req.user) {
      return res.status(401).json({ error: 'User does not exist' });
    }
    next();
  } catch (error) {
    console.error('Auth Middleware Error:', error);
    res.status(401).json({ error: 'Request is not authorized' });
  }
};
