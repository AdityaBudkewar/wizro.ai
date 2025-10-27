import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ error: 'Unauthorized - No token provided' });

    return;
  }

  jwt.verify(token, 'nazneen', (err, decoded) => {
    if (err) {
      res.status(403).json({ error: 'Forbidden - Invalid token' });

      return;
    }

    req.user = decoded;
    next();
  });
};

export default verifyToken;
