const { create, checkUsername, checkEmail } = require('./store');

const createUser = async (body) => {
	const { username, email } = body;
	const currentDate = new Date().toISOString().slice(0, 10);
	const user = {
		username,
		password: body.password,
		email,
		firstName: body.firstname,
		surname1: body.surname1,
		surname2: body.surname2,
		birthday: body.birthday,
		creationDate: currentDate,
	};

	const isUsernameAvailable = await checkUsername(username);
	const isEmailAvailable = await checkEmail(email);

	return new Promise((resolve, reject) => {
		if (!isUsernameAvailable) {
			if (!isEmailAvailable) {
				const userCreated = create(user);
				resolve(userCreated);
			}

			reject('Email is already being used');
		}

		reject('Username is already being used');
	});
};

module.exports = {
	createUser,
};
