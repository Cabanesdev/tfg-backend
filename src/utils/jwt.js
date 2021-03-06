const { sign, verify } = require('jsonwebtoken');
const config = require('../config/');
const responses = require('../network/responses');
const { tokenKey } = config;

const createToken = (user) => {
  const { _id: id } = user;

  return sign({ id }, tokenKey);
};

const validateToken = (req, res, next) => {
  const token = req.headers['bearer-token'];

  if (!token)
    return responses.error(req, res, 'Unauthorized', 401, 'No token found');

  try {
    const validToken = verify(token, tokenKey);
    if (validToken) {
      req.authenticated = true;
      req.userId = validToken.id;
      return next();
    }
  } catch (err) {
    return responses.error(req, res, 'Unauthorized', 401, err);
  }
};

module.exports = {
  createToken,
  validateToken,
};
