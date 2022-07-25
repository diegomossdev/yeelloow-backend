'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'sliders',
      [
        {
          type: 'image/jpeg',
          originalname: 'slider_default.jpg',
          filename: 'slider_default.jpg',
          path: 'sliders/slider_default.jpg',
          size: 9939,
          link: 'https://www.google.com.br',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'image/jpeg',
          originalname: 'slider_default.jpg',
          filename: 'slider_default.jpg',
          path: 'sliders/slider_default.jpg',
          size: 9939,
          link: 'https://www.google.com.br',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface) => queryInterface.bulkDelete('sliders', null, {}),
};
