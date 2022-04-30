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

router.get('', async (req, res) => {
  try {
    const username = req.query.username;
    let page = req.query.page || 1;

    if (!username)
      throw new Error('Username filter cant be empty string');

    const users = await searchByUsername(username, page)
    response.succes(req, res, 'FilterUser', 200, users)
  } catch (err) {
    response.error(req, res, 'Error', 400, err.message);
  }
});

router.get('/session', validateToken, async (req, res) => {
  try {
    const user = await getUser(req.userId)
    response.succes(req, res, 'Get User', 200, user)

  } catch (err) {
    response.error(req, res, 'Error', 400, err.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    if (req.params.id.length !== 24)
      throw new Error('Id Format wrong');

    const user = await getUser(req.params.id)
    response.succes(req, res, 'Get User', 200, user);
  } catch (err) {
    response.error(req, res, 'Error', 400, err.message);
  }

});

router.post('', async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body);

    if (error) {
      const errorMessage = getValidationErrorMessage(error);
      return response.error(req, res, 'Error', 400, errorMessage);
    }
    await createUser(req.body)
    response.succes(req, res, 'Create User', 200, 'User Created Succesfully');

  } catch (err) {
    response.error(req, res, 'Error', 400, err.message)
  }
});

router.post('/login', async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);

    if (error) {
      const errorMessage = getValidationErrorMessage(error);
      throw new Error(errorMessage);
    }

    const user = await login(req.body)
    const token = createToken(user);
    res.set('bearer-token', token);
    response.succes(req, res, 'User', 200, 'Login successfully')
  } catch (err) {
    response.error(req, res, 'Error', 400, err.message);
  }
});

router.put('', validateToken, async (req, res) => {
  try {
    const { error } = editSchema.validate(req.body);

    if (error) {
      const errorMessage = getValidationErrorMessage(error);
      return response.error(req, res, 'Error', 400, errorMessage);
    }

    await editUser(req.userId, req.body)
    response.succes(req, res, 'User Edited', 204, '');
  } catch (err) {
    response.error(req, res, 'Error', 400, err.message);
  }

});

module.exports = router;
