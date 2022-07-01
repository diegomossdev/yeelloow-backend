const { authJwt } = require('../middleware');
const controller = require('../controllers/category.controller');

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.get('/api/categories', controller.findAllCategories);

  app.get('/api/category/:categoryId', controller.findCategoryById);

  app.post(
    '/api/category',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.addCategory
  );

  app.put(
    '/api/category/:categoryId',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateCategory
  );

  app.delete(
    '/api/category/:categoryId',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteCategory
  );
};
