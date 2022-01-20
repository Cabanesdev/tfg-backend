const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	userId: {
		type: String,
		required: true,
	},
	creationDate: {
		type: Date,
		required: true,
	},
});

const postModel = mongoose.model('post', postSchema, 'post');

module.exports = { postModel };
