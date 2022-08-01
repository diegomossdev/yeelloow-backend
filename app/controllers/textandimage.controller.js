const db = require('../models');
const fs = require('fs');
const path = require('path');
const TextAndImages = db.textandimage;

const dir = path.resolve();

const findAllTextAndImages = async (req, res) => {
  try {
    const textAndImages = await TextAndImages.findAll();
    return res.status(200).send({ status: 200, data: textAndImages });
  } catch (error) {
    return res.status(500).send({ status: 500, message: error.message });
  }
};

const addTextAndImages = async (req, res) => {
  try {
    TextAndImages.create({
      type: req.file.mimetype,
      originalname: req.file.originalname,
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
      text: req.body.text,
    }).then((image) => {
      return res.status(200).send({
        status: 200,
        message: 'Texto e imagem criado com sucesso!',
        data: {
          type: req.file.mimetype,
          originalname: req.file.originalname,
          filename: req.file.filename,
          path: req.file.path,
          size: req.file.size,
          text: req.body.text,
        },
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      status: 500,
      message: `Erro ao cadastrar texto e imagem: ${error}`,
    });
  }
};

const updateTextAndImages = async (req, res) => {
  const exists = await TextAndImages.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!exists) {
    return res.status(400).send({
      status: 400,
      message: 'Não existe um item com esse id.',
    });
  }

  try {
    const file = {};
    if (req.file) {
      (file.type = req.file.mimetype),
        (file.originalname = req.file.originalname),
        (file.filename = req.file.filename),
        (file.path = req.file.path),
        (file.size = req.file.size);
    } else {
      (file.type = exists.type),
        (file.originalname = exists.originalname),
        (file.filename = exists.filename),
        (file.path = exists.path),
        (file.size = exists.size);
    }
    const textandimage = await exists.update(
      {
        ...file,
        text: req.body.text ? req.body.text : exists.text,
      },
      { where: { id: req.params.id } }
    );

    return res
      .status(200)
      .send({
        status: 200,
        data: textandimage,
        message: 'Texto e/ou imagem alterado com sucesso!',
      });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const deleteTextAndImages = async (req, res) => {
  const exists = await TextAndImages.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!exists) {
    return res.status(400).send({
      status: 400,
      message: 'Não nenhum item com esse id.',
    });
  }

  try {
    await TextAndImages.destroy({
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
    return res.status(200).send({ status: 200, message: 'Ok, item deletado!' });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = {
  findAllTextAndImages,
  addTextAndImages,
  updateTextAndImages,
  deleteTextAndImages,
};
