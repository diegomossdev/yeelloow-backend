const db = require('../models');
const Page = db.page;
const Sliders = db.sliders;
const TextAndImages = db.textandimage;
const Event = db.event;
const Information = db.informations;
const Testimonial = db.testimonial;
const CompanyImages = db.companyimage;

const findAllPages = async (req, res) => {
  try {
    const pages = await Page.findAll();
    return res.status(200).send({ status: 200, data: pages });
  } catch (error) {
    return res.status(500).send({ status: 500, message: error.message });
  }
};

const pageHome = async (req, res) => {
  try {
    const exists = await Page.findOne({
      where: {
        id: req.params.id,
      },
    });
    const textandimages = await TextAndImages.findAll();
    const sliders = await Sliders.findAll();
    const events = await Event.findAll({
      offset: 0,
      limit: 6,
    });
    const infos = await Information.findAll();
    const testimonials = await Testimonial.findAll();

    const page = {
      page: exists,
      sliders,
      textandimages,
      events,
      informations: infos,
      testimonials,
    };

    return res.status(200).send({ status: 200, data: page });
  } catch (error) {
    return res.status(500).send({ status: 500, message: error.message });
  }
};

const pageCompany = async (req, res) => {
  try {
    const exists = await Page.findOne({
      where: {
        id: req.params.id,
      },
    });

    const infos = await Information.findAll();
    const images = await CompanyImages.findAll();

    const page = {
      page: exists,
      informations: infos,
      images,
    };

    return res.status(200).send({ status: 200, data: page });
  } catch (error) {
    return res.status(500).send({ status: 500, message: error.message });
  }
};

const pageContact = async (req, res) => {
  try {
    const exists = await Page.findOne({
      where: {
        id: req.params.id,
      },
    });

    const infos = await Information.findAll();

    const page = {
      page: exists,
      informations: infos,
    };

    return res.status(200).send({ status: 200, data: page });
  } catch (error) {
    return res.status(500).send({ status: 500, message: error.message });
  }
};

const updatePage = async (req, res) => {
  const pageUpdate = await Page.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!pageUpdate) {
    return res.status(400).send({
      status: 400,
      message: 'Não existe uma página com esse id.',
    });
  }

  await Page.update(
    {
      title: req.body.title,
      description: req.body.description,
    },
    { where: { id: req.params.id } }
  );

  return res.status(200).send({
    status: 200,
    message: 'Página atualizada com sucesso!',
    data: {
      title: req.body.title,
      description: req.body.description,
    },
  });
};

const addPage = async (req, res) => {
  try {
    Page.create({
      title: req.body.title,
      description: req.body.description,
    }).then(() => {
      return res.status(200).send({
        status: 200,
        message: 'Página cadastrada com sucesso!',
        data: {
          title: req.body.title,
          description: req.body.description,
        },
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      status: 500,
      message: `Erro ao cadastrar a página: ${error}`,
    });
  }
};

module.exports = {
  findAllPages,
  pageHome,
  pageCompany,
  pageContact,
  updatePage,
  addPage,
};
