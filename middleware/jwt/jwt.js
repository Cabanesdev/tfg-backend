const { sign, verify } = require('jsonwebtoken');
const config = require('../../config/index');
const { tokenKey } = config;

const createToken = (user) => {
	const { username, id } = user;

	return (token = sign({ username, id }, tokenKey));
};

module.exports = {
	createToken,
};
