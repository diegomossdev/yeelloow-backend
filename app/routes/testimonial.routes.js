const { authJwt } = require('../middleware');
const controller = require('../controllers/testimonial.controller');
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

  app.get('/api/testimonials', controller.findAllTestimonials);

  app.post(
    '/api/testimonial',
    [authJwt.verifyToken, authJwt.isAdmin, upload.single('file')],
    controller.addTestimonial
  );

  app.put(
    '/api/testimonial/:id',
    [authJwt.verifyToken, authJwt.isAdmin, upload.single('file')],
    controller.updateTestimonial
  );

  app.delete(
    '/api/testimonial/:id',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteTestimonial
  );
};
