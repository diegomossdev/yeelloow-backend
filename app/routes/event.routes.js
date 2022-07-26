const { authJwt } = require('../middleware');
const controller = require('../controllers/event.controller');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/');
  },
  filename: function (req, file, cb) {
    // Extração da extensão do arquivo original:
    const extensaoArquivo = file.originalname.split('.')[1];

    // Cria um código randômico que será o nome do arquivo
    const novoNomeArquivo = require('crypto').randomBytes(64).toString('hex');

    // Indica o novo nome do arquivo:
    cb(null, `${novoNomeArquivo}.${extensaoArquivo}`);
  },
});

const upload = multer({ storage, limits: { fileSize: 2000000000000000 } });

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.get('/api/events', controller.findAllEvents);

  app.get('/api/event/:id', controller.findEventById);

  app.post(
    '/api/event',
    [authJwt.verifyToken, authJwt.isAdmin, upload.array('files', 10)],
    controller.addEvent
  );

  app.put(
    '/api/event/:id',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateEvent
  );

  app.put(
    '/api/event/cover-img/:id',
    [authJwt.verifyToken, authJwt.isAdmin, upload.single('file')],
    controller.updateCoverImg
  );

  app.post(
    '/api/event/add-images/:id',
    [authJwt.verifyToken, authJwt.isAdmin, upload.array('files', 10)],
    controller.updateImages
  );

  app.delete(
    '/api/event/:id',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteEvent
  );

  app.delete(
    '/api/event/image/:id',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deletePhotoEvent
  );
};
