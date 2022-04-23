const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  biography: {
    type: String,
  },
  webpage: {
    type: String,
  },
  birthday: {
    type: Date,
  },
  creationDate: {
    type: Date,
    required: true,
  },
});

const userModel = mongoose.model('user', userSchema, 'user');

module.exports = userModel;
