const db = require('../models');
const Category = db.category;

exports.addCategory = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      status: 400,
      message: 'Você precisa enviar dados',
    });
  }

  const exists = await Category.findOne({
    where: {
      title: req.body.title,
    },
  });

  if (exists) {
    return res.status(400).send({
      status: 400,
      message: 'Uma categoria com este título já está criada!',
    });
  }

  try {
    const category = await Category.create({
      title: req.body.title,
      subtitle: req.body.subtitle,
      description: req.body.description,
    });
    return res.status(200).send({
      status: 200,
      data: `Categoria id ${category.id} criado com sucesso!`,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.findAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    return res.status(200).send({ status: 200, data: categories });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.findCategoryById = async (req, res) => {
  try {
    const categoryById = await Category.findOne({
      where: {
        id: req.params.categoryId,
      },
      include: [
        {
          association: 'items',
          attributes: ['id', 'title'],
        },
      ],
    });

    if (!categoryById) {
      return res.status(400).send({
        status: 400,
        message: 'Não existe uma categoria com esse id.',
      });
    }

    return res.status(200).send({ status: 200, data: categoryById });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  const categoryUpdate = await Category.findOne({
    where: {
      id: req.params.categoryId,
    },
  });

  if (!categoryUpdate) {
    return res.status(400).send({
      status: 400,
      message: 'Não existe uma categoria com esse id.',
    });
  }

  try {
    const category = await categoryUpdate.update({
      title: req.body.title,
      subtitle: req.body.subtitle,
      description: req.body.description,
    });
    return res.status(200).send({ status: 200, data: category });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  const exists = await Category.findOne({
    where: {
      id: req.params.categoryId,
    },
  });

  if (!exists) {
    return res.status(400).send({
      status: 400,
      message: 'Não existe uma categoria com esse id.',
    });
  }

  try {
    await Category.destroy({
      where: {
        id: req.params.categoryId,
      },
    });
    return res
      .status(200)
      .send({ status: 200, message: 'Ok, categoria deletada!' });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
