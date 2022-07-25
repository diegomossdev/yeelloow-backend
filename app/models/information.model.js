module.exports = (sequelize, Sequelize) => {
  const Information = sequelize.define('informations', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    key: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    value: {
      type: Sequelize.STRING,
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

  return Information;
};
