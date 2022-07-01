const db = require('../models');
const Item = db.item;

exports.addItem = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      status: 400,
      message: 'Você precisa enviar dados',
    });
  }

  const exists = await Item.findOne({
    where: {
      title: req.body.title,
    },
  });

  if (exists) {
    return res.status(400).send({
      status: 400,
      message: 'Um item com este título já está criado!',
    });
  }

  try {
    const item = await Item.create({
      title: req.body.title,
      subtitle: req.body.subtitle,
      description: req.body.description,
      categoryId: req.body.categoryId,
    });
    return res.status(200).send({
      status: 200,
      data: `Item id ${item.id} criado com sucesso!`,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.findAllItems = async (req, res) => {
  try {
    const items = await Item.findAll();
    return res.status(200).send({ status: 200, data: items });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.updateItem = async (req, res) => {
  const itemUpdate = await Item.findOne({
    where: {
      id: req.params.itemId,
    },
  });

  if (!itemUpdate) {
    return res.status(400).send({
      status: 400,
      message: 'Não existe um item com esse id.',
    });
  }

  try {
    const item = await itemUpdate.update({
      title: req.body.title,
      subtitle: req.body.subtitle,
      description: req.body.description,
      categoryId: req.body.categoryId,
    });
    return res.status(200).send({ status: 200, data: item });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.deleteItem = async (req, res) => {
  const exists = await Item.findOne({
    where: {
      id: req.params.itemId,
    },
  });

  if (!exists) {
    return res.status(400).send({
      status: 400,
      message: 'Não existe um item com esse id.',
    });
  }

  try {
    await Item.destroy({
      where: {
        id: req.params.itemId,
      },
    });
    return res.status(200).send({ status: 200, message: 'Ok, item deletado!' });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
