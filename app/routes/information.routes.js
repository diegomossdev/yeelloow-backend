const { authJwt } = require('../middleware');
const controller = require('../controllers/information.controller');

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.get('/api/informations', controller.findAllInformation);

  app.post(
    '/api/information',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.addInformation
  );

  app.put(
    '/api/information/:id',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateInformation
  );

  app.delete(
    '/api/information/:id',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteInformation
  );
};
