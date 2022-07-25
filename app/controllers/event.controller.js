const db = require('../models');
const fs = require('fs');
const path = require('path');
const Event = db.event;
const Photo = db.photo;

const dir = path.resolve();

const findAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll({
      offset: req.query?.offset ? Number(req.query.offset) : 0,
      limit: req.query?.limit ? Number(req.query.limit) : 999999,
    });

    return res.status(200).send({ status: 200, data: events });
  } catch (error) {
    return res.status(500).send({ status: 500, message: error.message });
  }
};

const updateEvent = async (req, res) => {
  try {
    const eventById = await Event.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!eventById) {
      return res.status(400).send({
        status: 400,
        message: 'Não existe um evento com esse id.',
      });
    }

    try {
      const event = await eventById.update({
        title: req.body.title,
        subtitle: req.body.subtitle,
        description: req.body.description,
      });
      return res
        .status(200)
        .send({
          status: 200,
          message: 'Evento alterado com sucesso.',
          data: event,
        });
    } catch (error) {
      return res
        .status(500)
        .send({ message: `Ocorreu um erro: ${error.message}` });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const addEvent = async (req, res) => {
  try {
    if (!req.files.length) {
      return res.status(400).send({
        status: 400,
        message: 'Você precisa enviar uma imagem de capa',
      });
    }

    Event.create({
      title: req.body.title,
      subtitle: req.body.subtitle,
      description: req.body.description,
      coverimg: req.files[0].path,
    }).then((response) => {
      if (req.files.length > 1) {
        const photos = [];
        req.files.map((file) =>
          photos.push({
            type: file.mimetype,
            originalname: file.originalname,
            filename: file.filename,
            path: file.path,
            size: file.size,
            eventId: response.id,
          })
        );

        Photo.bulkCreate(photos).then(() => {
          return res.status(200).send({
            status: 200,
            message: 'Evento e imagens cadastrados com sucesso!',
            data: {
              title: req.body.title,
              subtitle: req.body.subtitle,
              description: req.body.description,
              coverimg: req.files[0].path,
            },
          });
        });
      } else {
        return res.status(200).send({
          status: 200,
          message: 'Evento cadastrado com sucesso!',
          data: {
            title: req.body.title,
            subtitle: req.body.subtitle,
            description: req.body.description,
            coverimg: req.files[0].path,
          },
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      status: 500,
      message: `Erro ao cadastrar o evento: ${error}`,
    });
  }
};

const findEventById = async (req, res) => {
  const exists = await Event.findOne({
    where: {
      id: req.params.id,
    },
    include: Photo,
  });

  if (!exists) {
    return res.status(400).send({
      status: 400,
      message: 'Não existe um evento com esse id.',
    });
  }

  if (exists) {
    return res.status(200).send({ status: 200, data: exists });
  }
};

const deleteEvent = async (req, res) => {
  const exists = await Event.findOne({
    where: {
      id: req.params.id,
    },
    include: Photo,
  });

  const pathsImagesDestroy = [];

  pathsImagesDestroy.push(exists.dataValues.coverimg);
  if (exists.photos.length) {
    exists.photos.map((photo) =>
      pathsImagesDestroy.push(photo.dataValues.path)
    );
  }

  if (!exists) {
    return res.status(400).send({
      status: 400,
      message: 'Não existe um evento com esse id.',
    });
  }

  try {
    await Event.destroy({
      where: {
        id: req.params.id,
      },
    });

    pathsImagesDestroy.map((img) =>
      fs.unlink(dir + `/${img}`, (err) => {
        if (err) {
          console.log('ERRO AO DELETAR ARQUIVO', err);
        }
        console.log('successfully deleted file');
      })
    );

    return res
      .status(200)
      .send({ status: 200, message: 'Ok, evento deletado!' });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const deletePhotoEvent = async (req, res) => {
  const exists = await Photo.findOne({
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
    await Photo.destroy({
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
  findAllEvents,
  addEvent,
  updateEvent,
  findEventById,
  deleteEvent,
  deletePhotoEvent,
};
