'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'events',
      [
        {
          title: 'Evento 1',
          subtitle: 'Subtitulo evento 1',
          description: 'Descrição evento 1',
          coverimg: 'images/default.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Evento 2',
          subtitle: 'Subtitulo evento 2',
          description: 'Descrição evento 2',
          coverimg: 'images/default.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Evento 3',
          subtitle: 'Subtitulo evento 3',
          description: 'Descrição evento 3',
          coverimg: 'images/default.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Evento 4',
          subtitle: 'Subtitulo evento 4',
          description: 'Descrição evento 4',
          coverimg: 'images/default.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Evento 5',
          subtitle: 'Subtitulo evento 5',
          description: 'Descrição evento 5',
          coverimg: 'images/default.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Evento 6',
          subtitle: 'Subtitulo evento 6',
          description: 'Descrição evento 6',
          coverimg: 'images/default.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Evento 7',
          subtitle: 'Subtitulo evento 7',
          description: 'Descrição evento 7',
          coverimg: 'images/default.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Evento 8',
          subtitle: 'Subtitulo evento 8',
          description: 'Descrição evento 8',
          coverimg: 'images/default.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface) => queryInterface.bulkDelete('events', null, {}),
};
