const express = require('express');
const response = require('../../network/responses');

const {
	registerSchema,
} = require('../../middleware/validators/user.validator');
const { createUser } = require('./controller');

const router = express.Router();

router.post('/create', (req, res) => {
	const { error } = registerSchema.validate(req.body);

	if (error)
		return response.error(req, res, 'Error', 400, error.details[0].message);

	createUser(req.body)
		.then((data) => {
			console.log(data);
			response.succes(req, res, 'User Created successfully', 200, data);
		})
		.catch((err) => {
			console.log(err);
			response.error(req, res, 'Error', 400, err);
		});
});

module.exports = router;
