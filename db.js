const mongoose = require('mongoose');
const { config } = require('./config');

let connect = async () => {
	await mongoose.connect(config.url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		maxPoolSize: 2,
	});
	console.log('[DB] conectada');
};

module.exports = connect;
