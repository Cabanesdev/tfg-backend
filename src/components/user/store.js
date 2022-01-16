const { userModel } = require('./model');

const create = async (userdata) => {
	const user = await userModel.create([userdata]);
	return user[0];
};

const getUserById = async (id) =>
	await userModel.findById(id).select('-password');

const getPasswordByUsername = async (username) => {
	const password = await userModel.find({ username }).select('password');
	return password[0];
};

const checkUsername = async (username) => await userModel.exists({ username });

const checkEmail = async (email) => await userModel.exists({ email });

module.exports = {
	create,
	checkUsername,
	checkEmail,
	getUserById,
	getPasswordByUsername,
};
