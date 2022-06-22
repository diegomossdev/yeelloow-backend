const { authJwt } = require('../middleware');
const controller = require('../controllers/post.controller');

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.get('/api/posts', controller.findAllPosts);

  app.post(
    '/api/post',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.addPost
  );

  app.put(
    '/api/post/:postId',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updatePost
  );

  app.delete(
    '/api/post/:postId',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deletePost
  );
};
