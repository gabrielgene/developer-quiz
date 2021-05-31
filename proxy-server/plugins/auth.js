const jwt = require('jsonwebtoken');

function auth(secret) {
  return (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      res.status(401).send('Unauthorized');
    } else {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          throw err;
        }
        return decoded.testToken;
      });

      next();
    }
  };
}

module.exports = auth;
