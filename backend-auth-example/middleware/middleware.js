const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhh';

const withAuth = async (req, res, next)  => {
  try {
    const token = 
        req.body.token ||
        req.query.token ||
        req.headers['x-access-token'] ||
        req.cookies.token;
    if (!token) {
      return res.status(401).send('Unauthorized: No token provided');
    } 
    const decoded = await jwt.verify(token, secret);
      if (!decoded) {
        return res.status(401).send('Unauthorized: Invalid token');
      }
        req.email = decoded.email;
        next();
      } catch(err) {
          return res.status(500).json("server error");
      }
}

module.exports = withAuth;