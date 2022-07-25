module.exports = (sequelize, Sequelize) => {
  const Textandimage = sequelize.define('textandimage', {
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
  });
  return Textandimage;
};
