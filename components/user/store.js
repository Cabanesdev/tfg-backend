const { userModel } = require('./model');

const create = async (userdata) => {
	const user = await userModel.create([userdata]);
	return user;
};

const checkUsername = async (username) => {
	return await userModel.exists({ username: username });
};

const checkEmail = async (email) => {
	return await userModel.exists({ email: email });
};

module.exports = {
	create,
	checkUsername,
	checkEmail,
};
