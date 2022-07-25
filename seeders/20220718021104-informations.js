'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'informations',
      [
        {
          key: 'endereço',
          value: 'Jln Cempaka Wangi No 22, Jakarta Indonesia',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          key: 'email',
          value: 'hello@yourdomain.tld',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          key: 'telefone',
          value: '+6221.2002.2012',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          key: 'logo',
          value: '+6221.2002.2012',
          type: 'image/jpeg',
          originalname: 'default.jpg',
          filename: 'default.jpg',
          path: 'images/default.jpg',
          size: 8040,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          key: 'empresa',
          value: '+AH Festas e Eventos',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          key: 'primaryColor',
          value: '#34ccf5',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          key: 'secondaryColor',
          value: '#db1b64',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface) => queryInterface.bulkDelete('informations', null, {}),
};
