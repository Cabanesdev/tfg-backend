const express = require('express');
const response = require('../../network/responses');

const {
	registerSchema,
} = require('../../middleware/validators/user.validator');
const { createUser } = require('./controller');

const router = express.Router();

router.post('', (req, res) => {
	const { error } = registerSchema.validate(req.body);

	if (error) {
		const { getValidateErrorMessage } = require('../../utils/errorUtils');
		const errorMessage = getValidateErrorMessage(error);
		return response.error(req, res, 'Error', 400, errorMessage);
	}

	createUser(req.body)
		.then((data) => {
			response.succes(req, res, 'User Created successfully', 200, data);
		})
		.catch((err) => {
			response.error(req, res, 'Error', 400, err);
		});
});

module.exports = router;
