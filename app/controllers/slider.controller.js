const db = require('../models');
const fs = require('fs');
const path = require('path');
const Slider = db.sliders;

const dir = path.resolve();

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

const deleteSlider = async (req, res) => {
  const exists = await Slider.findOne({
    where: {
      id: req.params.sliderId,
    },
  });

  if (!exists) {
    return res.status(400).send({
      status: 400,
      message: 'Não existe um slider com esse id.',
    });
  }

  try {
    await Slider.destroy({
      where: {
        id: req.params.sliderId,
      },
    });
    fs.unlink(dir + `/${exists.dataValues.path}`, (err) => {
      if (err) {
        console.log('ERRO AO DELETAR ARQUIVO', err);
      }
      console.log('successfully deleted file');
    });
    return res
      .status(200)
      .send({ status: 200, message: 'Ok, slider deletado!' });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = {
  uploadSlider,
  deleteSlider,
};
