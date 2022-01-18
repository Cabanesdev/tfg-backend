const {
	create,
	checkUsername,
	checkEmail,
	getPasswordByUsername,
	getUserById,
} = require('./store');

const { encryptPass, comparePass } = require('@utils/encrypt');

const createUser = async (body) => {
	const { username, email, password } = body;
	const encryptedPassword = await encryptPass(password);
	const currentDate = new Date().toISOString().slice(0, 10);

	const newUser = {
		username,
		password: encryptedPassword,
		email,
		name: body.name,
		biography: body.biography,
		webpage: body.webpage,
		birthday: body.birthday,
		creationDate: currentDate,
	};

	const existsUsername = await checkUsername(username);
	const existsEmail = await checkEmail(email);

	return new Promise(async (resolve, reject) => {
		if (!existsUsername) {
			if (!existsEmail) {
				const { id } = await create(newUser);
				resolve(await getUserById(id));
			}

			reject('Email is already being used');
		}

		reject('Username is already being used');
	});
};

const login = async (body) => {
	const { username, password } = body;
	const userExists = await checkUsername(username);

	return new Promise(async (resolve, reject) => {
		if (userExists) {
			const { password: encryptedPassword } = await getPasswordByUsername(
				username
			);
			const isPasswordCorrect = await comparePass(password, encryptedPassword);

			if (isPasswordCorrect) resolve('Login successfully');
		}

		reject('Username or password is not correct');
	});
};

module.exports = {
	createUser,
	login,
};
