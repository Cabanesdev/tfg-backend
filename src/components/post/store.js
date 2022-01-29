const mongoose = require('mongoose');
const postModel = require('./model');

const create = async (data) => {
	const post = await postModel.create([data]);
	return post[0];
};

const getPostById = async (id) =>
	await postModel.findById(mongoose.Types.ObjectId(id));

const deleteByUserId = async (userId) => await postModel.deleteMany({ userId });

module.exports = { create, getPostById, deleteByUserId };
