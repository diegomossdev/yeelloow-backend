const db = require('../models');
const Slider = db.sliders;

const uploadSlider = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send({
        status: 400,
        message: 'Você precisa enviar uma imagem',
      });
    }

    Slider.create({
      type: req.file.mimetype,
      originalname: req.file.originalname,
      filename: req.file.filename,
      path: req.file.path,
      link: req.body.link,
      size: req.file.size,
    }).then((image) => {
      return res.status(200).send({
        status: 200,
        message: 'Imagem do slider enviada com sucesso!',
        data: {
          type: req.file.mimetype,
          originalname: req.file.originalname,
          filename: req.file.filename,
          path: req.file.path,
          link: req.body.link,
          size: req.file.size,
        },
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      status: 500,
      message: `Erro ao enviar a imagem do slider: ${error}`,
    });
  }
};
module.exports = {
  uploadSlider,
};
