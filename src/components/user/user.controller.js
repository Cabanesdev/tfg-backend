const {
  create,
  checkUsername,
  checkEmail,
  getPasswordByUsername,
  getUserById,
  getUserByUsername,
  edit,
  getUsersByUsername,
} = require('./user.repository');

const { encryptPass, comparePass } = require('../../utils/encrypt');

const createUser = async (body) => {
  try {
    const { username, email, password, name } = body;
    const encryptedPassword = await encryptPass(password);

    const newUser = {
      username,
      email,
      name,
      password: encryptedPassword,
      creationDate: new Date()
    };

    const existsUsername = await checkUsername(username);
    const existsEmail = await checkEmail(email);

    if (existsUsername) throw new Error('Username is already being used');
    if (existsEmail) throw new Error('Email is already being used');

    await create(newUser);
  } catch (err) {
    throw new Error(err.message);
  }
};

const login = async (body) => {
  try {
    const { username, password } = body;
    const userExists = await checkUsername(username);

    if (userExists) {
      const { password: encryptedPassword } = await getPasswordByUsername(
        username
      );
      const isPasswordCorrect = await comparePass(password, encryptedPassword);
      if (isPasswordCorrect) return await getUserByUsername(username);
    }

    throw new Error('Username or password is not correct');
  } catch (err) {
    throw new Error(err.message);
  }
};

const editUser = async (id, body) => {
  try {
    const { username } = body;
    if (username) {
      const existsUsername = await checkUsername(username);
      if (existsUsername) throw new Error('Username is already being used');
    }

    await edit(id, body);
  } catch (err) {
    throw new Error(err.message);
  }
};

const searchByUsername = async (username, page) => {
  try {
    const users = await getUsersByUsername(username, page);
    return users;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getUser = async (userId) => {
  try {
    const users = await getUserById(userId);
    return users;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  createUser,
  login,
  editUser,
  searchByUsername,
  getUser,
};
