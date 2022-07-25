const db = require('../models');
const fs = require('fs');
const path = require('path');
const Testimonial = db.testimonial;

const dir = path.resolve();

const findAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll();
    return res.status(200).send({ status: 200, data: testimonials });
  } catch (error) {
    return res.status(500).send({ status: 500, message: error.message });
  }
};

const addTestimonial = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send({
        status: 400,
        message: 'Você precisa enviar uma foto',
      });
    }

    Testimonial.create({
      type: req.file.mimetype,
      originalname: req.file.originalname,
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
      text: req.body.text,
      author: req.body.author,
      company: req.body.company,
    }).then(() => {
      return res.status(200).send({
        status: 200,
        message: 'Depoimento cadastrado com sucesso!',
        data: {
          image: {
            type: req.file.mimetype,
            originalname: req.file.originalname,
            filename: req.file.filename,
            path: req.file.path,
            size: req.file.size,
          },
          text: req.body.text,
          author: req.body.author,
          company: req.body.company,
        },
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      status: 500,
      message: `Erro ao cadastrar o depoimento: ${error}`,
    });
  }
};

const updateTestimonial = async (req, res) => {
  const testimonialById = await Testimonial.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!testimonialById) {
    return res.status(400).send({
      status: 400,
      message: 'Não existe um depoimento com esse id.',
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
      (file.type = testimonialById.type),
        (file.originalname = testimonialById.originalname),
        (file.filename = testimonialById.filename),
        (file.path = testimonialById.path),
        (file.size = testimonialById.size);
    }

    await Testimonial.update(
      {
        ...file,
        text: req.body.text,
        author: req.body.author,
        company: req.body.company,
      },
      { where: { id: req.params.id } }
    );

    return res.status(200).send({
      status: 200,
      message: 'Depoimento atualizado com sucesso!',
      data: {
        ...file,
        text: req.body.text,
        author: req.body.author,
        company: req.body.company,
      },
    });
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: `Erro ao atualizar depoimento: ${error.message}`,
    });
  }
};

const deleteTestimonial = async (req, res) => {
  const exists = await Testimonial.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!exists) {
    return res.status(400).send({
      status: 400,
      message: 'Não existe um depoimento com esse id.',
    });
  }

  try {
    await Testimonial.destroy({
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
      .send({ status: 200, message: 'Ok, depoimento deletado!' });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = {
  findAllTestimonials,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
