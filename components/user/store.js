const Model = require('./model');

let getAll = async () => {
	let users = await Model.userModel.find({});
	return users;
};

module.exports = {
	getAll,
};
