const db = require('../models');
const Information = db.informations;

const findAllInformation = async (req, res) => {
  try {
    const informations = await Information.findAll();
    return res.status(200).send({ status: 200, data: informations });
  } catch (error) {
    return res.status(500).send({ status: 500, message: error.message });
  }
};

const addInformation = async (req, res) => {
  try {
    Information.create({
      key: req.body.key,
      value: req.body.value,
      link: req.body.link,
    }).then((image) => {
      return res.status(200).send({
        status: 200,
        message: 'Informação cadastrada com sucesso!',
        data: {
          key: req.body.key,
          value: req.body.value,
          link: req.body.link,
        },
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      status: 500,
      message: `Erro ao cadastrar a informação: ${error}`,
    });
  }
};

const updateInformation = async (req, res) => {
  const exists = await Information.findOne({
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
    const info = await exists.update({
      value: req.body.value,
    });
    return res.status(200).send({ status: 200, data: info });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const updateLogoInformation = async (req, res) => {
  const exists = await Information.findOne({
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
    const logo = await exists.update({
      type: req.file.mimetype,
      originalname: req.file.originalname,
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
    });
    return res
      .status(200)
      .send({ status: 200, message: 'Logo alterado com sucesso', data: logo });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const deleteInformation = async (req, res) => {
  const exists = await Information.findOne({
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
    await Information.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).send({ status: 200, message: 'Ok, item deletado!' });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = {
  findAllInformation,
  addInformation,
  updateInformation,
  updateLogoInformation,
  deleteInformation,
};
