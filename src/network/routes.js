const user = require('../components/user/user.network');
const post = require('../components/post/post.network');
const comment = require('../components/comment/comment.network');

const routes = (server) => {
  server.use('/user', user);
  server.use('/post', post);
  server.use('/comment', comment);
};

module.exports = routes;
