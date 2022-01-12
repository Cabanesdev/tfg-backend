const { sign, verify } = require('jsonwebtoken');
const { config } = require('../../config/index');

const createToken = (user) => {
	const token = sign(
		{ username: user.username, id: user.id },
		config.token_key
	);

	return token;
};

module.exports = {
	createToken,
};
