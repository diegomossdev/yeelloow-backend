module.exports = (sequelize, Sequelize) => {
  const Slider = sequelize.define('slider', {
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
    link: {
      type: Sequelize.STRING,
    },
    size: {
      type: Sequelize.STRING,
    },
  });
  return Slider;
};
