const { authJwt } = require('../middleware');
const controller = require('../controllers/page.controller');

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.get('/api/pages', controller.findAllPages);

  app.get('/api/page-home/:id', controller.pageHome);

  app.get('/api/page-company/:id', controller.pageCompany);

  app.post(
    '/api/page',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.addPage
  );

  app.put(
    '/api/page/:id',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updatePage
  );
};
