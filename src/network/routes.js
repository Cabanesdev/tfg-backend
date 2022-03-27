const user = require('@components/user/network');
const post = require('@components/post/network');
const comment = require('@components/comment/network');

const routes = (server) => {
  server.use('/user', user);
  server.use('/post', post);
  server.use('/comment', comment);
};

module.exports = routes;
