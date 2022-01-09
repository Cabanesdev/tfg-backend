const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	firstName: {
		type: String,
		required: true,
	},
	surname1: {
		type: String,
		required: true,
	},
	surname2: {
		type: String,
		required: false,
	},
	birthday: {
		type: Date,
		required: false,
	},
	creationDate: {
		type: Date,
		required: true,
	},
});

const userModel = mongoose.model('user', userSchema, 'user');

module.exports = { userModel };
