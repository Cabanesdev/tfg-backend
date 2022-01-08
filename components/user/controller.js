let { getAll } = require('./store');

let getUser = () => {
	return new Promise((resolve, reject) => {
		let usersListed = getAll();
		resolve(usersListed);
	});
};

module.exports = {
	getUser,
};
