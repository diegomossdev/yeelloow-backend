module.exports = (sequelize, Sequelize) => {
  const Item = sequelize.define('item', {
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
    categoryId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'categories',
        key: 'id',
      },
    },
  });

  return Item;
};
