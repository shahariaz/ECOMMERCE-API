const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).json('token is not valid');
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: 'Invalid token' });
  }
};
const verifyTokenAndAuth = (req, res, next) => {
  (req, res) => {
    verifyTokenAuth(req, res, () => {
      if (req.user.id === req.params.user || req.user.isAdmin) {
        next();
      } else {
        req.status(403).json('Your are not authorized');
      }
    });
  };
};

module.exports = { verifyToken, verifyTokenAndAuth };
