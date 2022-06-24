const fs = require('fs');
const db = require('../models');
const Image = db.images;

const uploadFiles = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send({
        status: 400,
        message: 'Você precisa enviar uma imagem',
      });
    }

    console.log('uploadFiles req', req);

    Image.create({
      type: req.file.mimetype,
      name: req.file.originalname,
      data: fs.readFileSync('images/' + req.file.filename),
    }).then((image) => {
      console.log('then image', image);
      return res.status(200).send({
        status: 200,
        message: 'Imagem enviada com sucesso!',
        data: {
          path: req.file.path,
          mimetype: req.file.mimetype,
          size: req.file.size,
        },
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      status: 500,
      message: `Erro ao enviar a imagem: ${error}`,
    });
  }
};
module.exports = {
  uploadFiles,
};
