const { create, checkUsername, checkEmail, getUser } = require('./store');
const { encryptPass } = require('../../utils/encrypt');

const createUser = async (body) => {
	const { username, email } = body;
	const password = await encryptPass(body.password);
	const currentDate = new Date().toISOString().slice(0, 10);

	const user = {
		username,
		password,
		email,
		firstName: body.firstname,
		surname1: body.surname1,
		surname2: body.surname2,
		birthday: body.birthday,
		creationDate: currentDate,
	};

	const existsUsername = await checkUsername(username);
	const existsEmail = await checkEmail(email);

	return new Promise(async (resolve, reject) => {
		if (!existsUsername) {
			if (!existsEmail) {
				const userCreated = await create(user);
				const userId = userCreated[0].id;
				resolve(await getUser(userId));
			}

			reject('Email is already being used');
		}

		reject('Username is already being used');
	});
};

module.exports = {
	createUser,
};
