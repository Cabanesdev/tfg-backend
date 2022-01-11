const getValidationErrorMessage = (error) => {
	return error.details[0].message;
};

module.exports = {
	getValidationErrorMessage,
};
