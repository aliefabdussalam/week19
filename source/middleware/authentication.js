const jwt = require('jsonwebtoken');

const midauth = (req, res, next) => {
  const { token } = req.headers;
  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
      res.json(err);
    } else {
      req.userId = decoded.id;
      next();
    }
  });
};

module.exports = midauth;
