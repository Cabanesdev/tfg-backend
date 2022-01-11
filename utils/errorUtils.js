const { registerSchema } = require('../middleware/validators/user.validator');

const getValidateErrorMessage = (error) => {
	return error.details[0].message;
};

module.exports = {
	getValidateErrorMessage,
};
