const { sign, verify } = require('jsonwebtoken');
const config = require('@config');
const { tokenKey } = config;
const responses = require('@responses');

const createToken = (user) => {
	const { username, id } = user;

	return sign({ username, id }, tokenKey);
};

const validateToken = (req, res, next) => {
	const token = req.headers['bearer-token'];

	if (!token)
		return responses.error(req, res, 'Unauthorized', 400, 'No token found');

	try {
		const validToken = verify(token, tokenKey);
		if (validToken) {
			req.authenticated = true;
			req.userId = validToken.id;
			return next();
		}
	} catch (err) {
		return responses.error(req, res, 'Unauthorized', 400, err);
	}
};

module.exports = {
	createToken,
	validateToken,
};
