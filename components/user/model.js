const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema();

const userModel = mongoose.model('user', userSchema, 'user');

module.exports = { userModel };
