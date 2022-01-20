const user = require('@components/user/network');
const post = require('@components/post/network');

const routes = (server) => {
	server.use('/user', user);
	server.use('/post', post);
};

module.exports = routes;
