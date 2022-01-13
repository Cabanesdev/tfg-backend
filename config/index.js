require('dotenv').config();

const config = {
	port: process.env.PORT,
	url: process.env.URL,
	tokenKey: process.env.TOKEN_KEY,
};

module.exports = config;
