module.exports = (sequelize, DataTypes) => {
  const Slider = sequelize.define('slider', {
    type: {
      type: DataTypes.STRING,
    },
    originalname: {
      type: DataTypes.STRING,
    },
    filename: {
      type: DataTypes.STRING,
    },
    path: {
      type: DataTypes.STRING,
    },
    link: {
      type: DataTypes.STRING,
    },
    size: {
      type: DataTypes.STRING,
    },
  });
  return Slider;
};
