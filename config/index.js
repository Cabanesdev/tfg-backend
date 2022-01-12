require('dotenv').config();

const config = {
	port: process.env.PORT,
	url: process.env.URL,
	token_key: process.env.TOKEN_KEY,
};

module.exports = {
	config,
};
