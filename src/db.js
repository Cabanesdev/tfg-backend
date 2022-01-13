const mongoose = require('mongoose');
const config = require('@config');

const connect = () => {
	mongoose.connect(config.url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		maxPoolSize: 2,
	});
	console.log('[DB] conectada');
};

module.exports = connect;