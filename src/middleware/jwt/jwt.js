const { sign } = require('jsonwebtoken');
const config = require('@config');
const { tokenKey } = config;

const createToken = (user) => {
	const { username, id } = user;

	return sign({ username, id }, tokenKey);
};

module.exports = {
	createToken,
};
