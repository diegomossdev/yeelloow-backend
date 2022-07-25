module.exports = (sequelize, Sequelize) => {
  const Photo = sequelize.define('photo', {
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
  });
  return Photo;
};
