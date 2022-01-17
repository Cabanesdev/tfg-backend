const {
	create,
	checkUsername,
	checkEmail,
	getPasswordByUsername,
	getUserById,
	getUserByUsername,
	edit,
	getUsersByUsername,
} = require('./store');

const { encryptPass, comparePass } = require('@src/utils/encrypt');

const createUser = async (body) => {
	const { username, email } = body;
	const password = await encryptPass(body.password);
	const currentDate = new Date().toISOString().slice(0, 10);

	const newUser = {
		username,
		password,
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
				const userCreated = await create(newUser);
				const userId = userCreated.id;
				const user = await getUserById(userId);
				resolve(user);
			}

			reject('Email is already being used');
		}

		reject('Username is already being used');
	});
};

const login = async (body) => {
	const { username } = body;
	const userAlreadyExists = await checkUsername(username);

	return new Promise(async (resolve, reject) => {
		if (userAlreadyExists) {
			const { password } = await getPasswordByUsername(username);
			const isPasswordCorrect = await comparePass(body.password, password);
			const user = await getUserByUsername(username);

			if (isPasswordCorrect) resolve(user);
		}

		reject('Username or password is not correct');
	});
};

const editUser = async (id, body) => {
	const { username, email } = body;
	const newData = {
		name: body.name,
		biography: body.biography,
		webpage: body.webpage,
	};

	return new Promise(async (resolve, reject) => {
		if (username) {
			newData.username = username;
			const existsUsername = await checkUsername(username);
			if (existsUsername) return reject('Username is already being used');
		}

		if (email) {
			newData.email = email;
			const existsEmail = await checkEmail(email);
			if (existsEmail) return reject('Email is already being used');
		}

		await edit(id, newData);
		resolve('User has been updated');
	});
};

const searchByUsername = async (username) => {
	return new Promise(async (resolve) => {
		const users = await getUsersByUsername(username);
		resolve(users);
	});
};

module.exports = {
	createUser,
	login,
	editUser,
	searchByUsername,
};
