const db = require('../models');
const fs = require('fs');
const path = require('path');
const CompanyImage = db.companyimage;

const dir = path.resolve();

const findAllImages = async (req, res) => {
  try {
    const images = await CompanyImage.findAll();
    return res.status(200).send({ status: 200, data: images });
  } catch (error) {
    return res.status(500).send({ status: 500, message: error.message });
  }
};

const uploadImages = async (req, res) => {
  try {
    if (!req.files.length) {
      return res.status(400).send({
        status: 400,
        message: 'Você precisa enviar uma ou mais imagens',
      });
    }

    const images = [];
    req.files.map((file) =>
      images.push({
        type: file.mimetype,
        originalname: file.originalname,
        filename: file.filename,
        path: file.path,
        size: file.size,
      })
    );

    CompanyImage.bulkCreate(images).then(() => {
      return res.status(200).send({
        status: 200,
        message: 'Imagens cadastradas com sucesso!',
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      status: 500,
      message: `Erro ao enviar a imagens: ${error}`,
    });
  }
};

const deleteImage = async (req, res) => {
  const exists = await CompanyImage.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!exists) {
    return res.status(400).send({
      status: 400,
      message: 'Não existe uma imagem com esse id.',
    });
  }

  try {
    await CompanyImage.destroy({
      where: {
        id: req.params.id,
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
      .send({ status: 200, message: 'Ok, imagem deletada!' });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = {
  findAllImages,
  uploadImages,
  deleteImage,
};
