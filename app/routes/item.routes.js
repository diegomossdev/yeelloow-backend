const { authJwt } = require('../middleware');
const controller = require('../controllers/item.controller');

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.get('/api/items', controller.findAllItems);

  app.post(
    '/api/item',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.addItem
  );

  app.put(
    '/api/item/:itemId',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateItem
  );

  app.delete(
    '/api/item/:itemId',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteItem
  );
};
