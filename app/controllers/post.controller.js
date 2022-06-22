const db = require('../models');
const Post = db.post;

exports.addPost = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      status: 400,
      message: 'Você precisa enviar dados',
    });
  }

  const exists = await Post.findOne({
    where: {
      title: req.body.title,
    },
  });

  if (exists) {
    return res.status(400).send({
      status: 400,
      message: 'Um post com este título já está criado!',
    });
  }

  try {
    const post = await Post.create({
      title: req.body.title,
      subtitle: req.body.subtitle,
      description: req.body.description,
    });
    return res
      .status(200)
      .send({ status: 200, data: `Post id ${post.id} criado com sucesso!` });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.findAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    return res.status(200).send({ status: 200, data: posts });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.updatePost = async (req, res) => {
  const postUpdate = await Post.findOne({
    where: {
      id: req.params.postId,
    },
  });

  if (!postUpdate) {
    return res.status(400).send({
      status: 400,
      message: 'Não existe um post com esse id.',
    });
  }

  try {
    const post = await postUpdate.update({
      title: req.body.title,
      subtitle: req.body.subtitle,
      description: req.body.description,
    });
    return res.status(200).send({ status: 200, data: post });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  const exists = await Post.findOne({
    where: {
      id: req.params.postId,
    },
  });

  if (!exists) {
    return res.status(400).send({
      status: 400,
      message: 'Não existe um post com esse id.',
    });
  }

  try {
    await Post.destroy({
      where: {
        id: req.params.postId,
      },
    });
    return res.status(200).send({ status: 200, message: 'Ok, post deletado!' });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
