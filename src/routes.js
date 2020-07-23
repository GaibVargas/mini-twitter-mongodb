const routes = require('express').Router();

const UserController = require('./controllers/UserController');
const PostController = require('./controllers/PostController');

routes.get('/', (req, res) => {
  res.json({ message: "Working!" });
});

routes.get('/user', UserController.show);
routes.get('/user/:user_id', UserController.index);
routes.post('/user', UserController.create);
routes.post('/user/login', UserController.login);
routes.put('/user/updateName', UserController.updateName);

routes.get('/post', PostController.show);
routes.post('/post', PostController.create);
routes.post('/post/toggleLike/:post_id', PostController.toggleLike);

module.exports = routes;