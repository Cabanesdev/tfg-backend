const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  creationDate: {
    type: String,
    required: true,
  },
});

const commentModel = mongoose.model('comment', commentSchema, 'comment');

module.exports = commentModel;
