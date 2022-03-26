const mongoose = require('mongoose');
const postModel = require('./model');

const create = async (data) => {
	const post = await postModel.create([data]);
	return post[0];
};

const getPostById = async (id) =>
	await postModel.findById(mongoose.Types.ObjectId(id));

const getPostsByUserId = async (userId, page) =>
	await postModel
		.find({ userId })
		.skip((page - 1) * 4)
		.limit(4);

const deleteByUserId = async (userId) => await postModel.deleteMany({ userId });

const edit = async (id, newData) => {
	await postModel.findByIdAndUpdate(mongoose.Types.ObjectId(id), newData);
};

module.exports = {
	create,
	getPostById,
	getPostsByUserId,
	deleteByUserId,
	edit,
};
