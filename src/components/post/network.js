const express = require('express');
const router = express.Router();

const { createSchema } = require('@validators/post.validator');
const { validateToken } = require('@src/middleware/jwt');
const { createPost, getPost } = require('./controller');

const response = require('@responses');

router.get('', (req, res) => {
	const id = req.query.id;
	getPost(id)
		.then((data) => response.succes(req, res, 'Get Post', 200, data))
		.catch((err) => response.error(req, res, 'Error', 200, err));
});

router.post('', validateToken, (req, res) => {
	const { error } = createSchema.validate(req.body);

	if (error) {
		const { getValidationErrorMessage } = require('@utils/errorUtils');
		const errorMessage = getValidationErrorMessage(error);
		return response.error(req, res, 'Error', 400, errorMessage);
	}

	createPost(req.userId, req.body)
		.then((data) => response.succes(req, res, 'Create Post', 200, data))
		.catch((err) => response.error(req, res, 'Error', 200, err));
});

module.exports = router;
