module.exports = (sequelize, Sequelize) => {
  const Event = sequelize.define('event', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    subtitle: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    coverimg: {
      type: Sequelize.STRING,
    },
  });

  return Event;
};
