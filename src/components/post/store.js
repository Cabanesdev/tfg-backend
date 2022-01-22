const mongoose = require('mongoose');
const postModel = require('./model');

const create = async (data) => {
	const post = await postModel.create([data]);
	return post[0];
};

const getPostById = async (id) =>
	await postModel.findById(mongoose.Types.ObjectId(id));

module.exports = { create, getPostById };
