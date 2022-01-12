const bcrypt = require('bcrypt');

const encryptPass = async (password) => {
	const passwordEncrypted = await bcrypt.hash(password, 10);
	return passwordEncrypted;
};

module.exports = {
	encryptPass,
};
