require('dotenv').config();

const config = {
	port: process.env.PORT,
	url: process.env.URL,
};

module.exports = {
	config,
};
