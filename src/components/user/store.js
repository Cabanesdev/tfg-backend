const { userModel } = require('./model');

const create = async (userdata) => {
	const user = await userModel.create([userdata]);
	return user[0];
};

const getUserById = async (id) =>
	await userModel.findById(id).select('-password');

const getUserByUsername = async (username) =>
	await userModel.findOne({ username }).select('-password');

const getUsersByUsername = async (username) =>
	await userModel.find({ username: { $regex: '^' + username + '.*' } });

const getPasswordByUsername = async (username) =>
	await userModel.findOne({ username }).select('password');

const edit = async (id, data) => await userModel.findByIdAndUpdate(id, data);

const checkUsername = async (username) => await userModel.exists({ username });

const checkEmail = async (email) => await userModel.exists({ email });

module.exports = {
	create,
	checkUsername,
	checkEmail,
	getUserById,
	getUserByUsername,
	edit,
	getPasswordByUsername,
	getUsersByUsername,
};
