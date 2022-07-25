'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'textandimages',
      [
        {
          type: 'image/jpeg',
          originalname: 'default.jpg',
          filename: 'default.jpg',
          path: 'images/default.jpg',
          size: 8040,
          Text: 'Texto descrição 1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'image/jpeg',
          originalname: 'default.jpg',
          filename: 'default.jpg',
          path: 'images/default.jpg',
          size: 8040,
          Text: 'Texto descrição 2',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface) =>
    queryInterface.bulkDelete('textandimages', null, {}),
};
