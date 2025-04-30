const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
	
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send('No token provided');
  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(403).send('Invalid or expired token');
  }
}

module.exports = { authenticate };
