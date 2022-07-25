module.exports = (sequelize, Sequelize) => {
  const Testimonial = sequelize.define('testimonial', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: Sequelize.STRING,
    },
    originalname: {
      type: Sequelize.STRING,
    },
    filename: {
      type: Sequelize.STRING,
    },
    path: {
      type: Sequelize.STRING,
    },
    size: {
      type: Sequelize.STRING,
    },
    text: {
      type: Sequelize.TEXT,
    },
    author: {
      type: Sequelize.STRING,
    },
    company: {
      type: Sequelize.STRING,
    },
  });
  return Testimonial;
};
