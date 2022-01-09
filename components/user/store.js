const { userModel } = require('./model');

let getAll = async () => {
	let users = await userModel.find({});
	return users;
};

let createOne = async (user) => {
	let users = await userModel.create([user]);
	console.log(`users ${users}`);
	return users;
};

module.exports = {
	getAll,
	createOne,
};
