const express = require('express');
const response = require('../../network/responses');
const { createToken, validateToken } = require('../../utils/jwt');
const { getValidationErrorMessage } = require('../../utils/errorUtils');
const { registerSchema, loginSchema, editSchema } = require('./user.validator');

const {
  createUser,
  login,
  editUser,
  searchByUsername,
  getUser,
} = require('./user.controller');

const router = express.Router();

router.get('', (req, res) => {
  const username = req.query.username;
  let page = req.query.page || 1;

  if (!username)
    return response.error(
      req,
      res,
      'Error',
      400,
      'Username filter cant be empty string'
    );

  searchByUsername(username, page)
    .then((data) => response.succes(req, res, 'FilterUser', 200, data))
    .catch((err) => response.error(req, res, 'Error', 400, err));
});

router.get('/:id', (req, res) => {
  getUser(req.params.id)
    .then((data) => response.succes(req, res, 'Get User', 200, data))
    .catch((err) => response.error(req, res, 'Error', 400, err));
});

router.post('', (req, res) => {
  const { error } = registerSchema.validate(req.body);

  if (error) {
    const errorMessage = getValidationErrorMessage(error);
    return response.error(req, res, 'Error', 400, errorMessage);
  }

  createUser(req.body)
    .then(() => {
      response.succes(req, res, 'Create User', 200, 'User Created Succesfully');
    })
    .catch((err) => {
      response.error(req, res, 'Error', 400, err);
    });
});

router.post('/login', (req, res) => {
  const { error } = loginSchema.validate(req.body);

  if (error) {
    const errorMessage = getValidationErrorMessage(error);
    return response.error(req, res, 'Error', 400, errorMessage);
  }

  login(req.body)
    .then((data) => {
      const token = createToken(data);
      res.set('bearer-token', token);
      response.succes(req, res, 'User', 200, 'Login successfully')
    })
    .catch((err) => {
      response.error(req, res, 'Error', 400, err.message);
    });
});

router.put('', validateToken, (req, res) => {
  const { error } = editSchema.validate(req.body);

  if (error) {
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

// router.delete('', validateToken, (req, res) => {
//   deleteUser(req.userId)
//     .then((data) => {
//       response.succes(req, res, 'Delete user', 204, data);
//     })
//     .catch((err) => response.error(req, res, 'Error', 400, err));
// });

module.exports = router;