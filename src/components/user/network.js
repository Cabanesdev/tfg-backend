const express = require('express');
const response = require('@responses');

const {
	registerSchema,
	loginSchema,
	editSchema,
} = require('@validators/user.validator');
const { createToken, validateToken } = require('@src/middleware/jwt');

const {
	createUser,
	login,
	editUser,
	searchByUsername,
	deleteUser,
	getUserSession,
} = require('./controller');

const router = express.Router();

router.get('', (req, res) => {
	const username = req.query.username;
	let limit = req.query.limit || 5;
	let page = req.query.page || 0;

	if (!username)
		return response.error(
			req,
			res,
			'Error',
			400,
			'Username filter cant be empty string'
		);

	searchByUsername(username, limit, page)
		.then((data) => response.succes(req, res, 'FilterUser', 200, data))
		.catch((err) => response.error(req, res, 'Error', 400, err));
});

router.get('/session', validateToken, (req, res) => {
	getUserSession(req.userId)
		.then((data) => response.succes(req, res, 'User', 200, data))
		.catch((err) => response.error(req, res, 'Error', 400, err));
});

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
			res.set('x-access-token', token);
			response.succes(req, res, 'Login', 200, 'Login successfully');
		})
		.catch((err) => {
			response.error(req, res, 'Error', 400, err);
		});
});

router.put('', validateToken, (req, res) => {
	const { error } = editSchema.validate(req.body);

	if (error) {
		const { getValidationErrorMessage } = require('@src/utils/errorUtils');
		const errorMessage = getValidationErrorMessage(error);
		return response.error(req, res, 'Error', 400, errorMessage);
	}

	editUser(req.userId, req.body)
		.then((data) => {
			response.succes(req, res, 'User Edited', 204, data);
		})
		.catch((err) => {
			response.error(req, res, 'Error', 400, err);
		});
});

router.delete('', validateToken, (req, res) => {
	deleteUser(req.userId)
		.then((data) => {
			response.succes(req, res, 'Delete user', 204, data);
		})
		.catch((err) => response.error(req, res, 'Error', 400, err));
});

module.exports = router;
