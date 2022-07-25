const { authJwt } = require('../middleware');
const controller = require('../controllers/companyimage.controller');
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

const upload = multer({ storage });

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.get('/api/companyimages', controller.findAllImages);

  app.post(
    '/api/companyimage',
    [authJwt.verifyToken, authJwt.isAdmin, upload.array('files', 10)],
    controller.uploadImages
  );

  app.delete(
    '/api/companyimage/:id',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteImage
  );
};
