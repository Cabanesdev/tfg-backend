const express = require('express');
const response = require('../../network/responses');

const { getUser } = require('./controller');

const router = express.Router();

router.get('/', (req, res) => {
	getUser()
		.then((data) => {
			console.log(data);
			response.succes(req, res, 'Todo bien', 200, data);
		})
		.catch((err) => {
			console.log(err);
			response.error(req, res, 'Error', 400, err);
		});
});

module.exports = router;
