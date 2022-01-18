const express = require('express');
const response = require('@responses');

const { createToken } = require('@src/middleware/jwt');
const { registerSchema, loginSchema } = require('@validators/user.validator');

const { createUser, login } = require('./controller');

const router = express.Router();

router.post('', (req, res) => {
	const { error } = registerSchema.validate(req.body);

	if (error) {
		const { getValidationErrorMessage } = require('@utils/errorUtils');
		const errorMessage = getValidationErrorMessage(error);
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

router.post('/login', (req, res) => {
	const { error } = loginSchema.validate(req.body);

	if (error) {
		const { getValidationErrorMessage } = require('@utils/errorUtils');
		const errorMessage = getValidationErrorMessage(error);
		return response.error(req, res, 'Error', 400, errorMessage);
	}

	login(req.body)
		.then((data) => {
			const token = createToken(data);
			res.cookie('access-token', token, {
				maxAge: 12 * 60 * 60 * 1000, // 12h
			});
			response.succes(req, res, 'Login successfully', 200, data);
		})
		.catch((err) => {
			response.error(req, res, 'Error', 400, err);
		});
});

module.exports = router;
