const { userModel } = require('./model');

const create = async (userdata) => await userModel.create([userdata]);

const getUserById = async (id) =>
	await userModel.findById(id).select('-password');

const getPasswordByUsername = async (username) =>
	await userModel.find({ username }).select('password');

const checkUsername = async (username) => await userModel.exists({ username });

const checkEmail = async (email) => await userModel.exists({ email });

module.exports = {
	create,
	checkUsername,
	checkEmail,
	getUserById,
	getPasswordByUsername,
};
