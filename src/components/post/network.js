const express = require('express');
const router = express.Router();

const { createSchema } = require('@validators/post.validator');
const { validateToken } = require('@src/middleware/jwt');
const { createPost, getById, getByUserId } = require('./controller');

const response = require('@responses');

router.get('/:id', (req, res) => {
	const id = req.params.id;

	if (!id)
		return response.error(
			req,
			res,
			'Error',
			400,
			'Cannot retrieve a post without an id'
		);

	getById(id)
		.then((data) => response.succes(req, res, 'Get Post', 200, data))
		.catch((err) => response.error(req, res, 'Error', 400, err));
});

//getByUserId pagination
router.get('/', validateToken, (req, res) => {
	const userId = req.query.userId;

	if (!userId)
		return response.error(req, res, 'Error', 400, 'User Id can not be empty');
	const page = req.query.page | 1;

	getByUserId(userId, page)
		.then((data) => response.succes(req, res, 'Get Post by User', 200, data))
		.catch((err) => response.error(req, res, 'Error', 400, err));
});

router.post('/', validateToken, (req, res) => {
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

//edit post
router.put('/:id', validateToken, (req, res) => {
	const postId = req.params.id;
});

//Delete post
router.delete('/:id');

module.exports = router;
