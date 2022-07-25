'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'pages',
      [
        {
          title: 'Página inicial',
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          title: 'Quem somos',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque auctor nibh sed arcu pretium, vel facilisis diam commodo. Nulla imperdiet bibendum orci, sit amet luctus nisi aliquam at. Etiam at semper nunc. Ut tincidunt, risus id pulvinar tincidunt, mauris augue placerat mi, et malesuada dui ante non lorem. Nam porttitor urna lectus, id ultrices neque pellentesque ac. Cras mollis elementum orci, eu ornare ipsum elementum nec. Phasellus quis lorem neque. Pellentesque volutpat, magna non congue imperdiet, erat metus faucibus ex, nec porta nibh dolor quis urna. Duis maximus neque et feugiat eleifend. Aenean sed ex sed purus dictum luctus in eu nisl. Aenean accumsan neque ante, sed ultrices nunc pretium et. Etiam condimentum, dolor et sagittis pretium, ex massa posuere velit, et porttitor est justo sed est. Morbi aliquet, risus sed egestas tempor, urna velit aliquet purus, sed placerat felis purus in velit. Nullam ac ultricies magna. Ut tempor non libero fringilla ultricies. Duis non scelerisque tortor. Vestibulum dapibus at sapien viverra rhoncus. Praesent finibus erat mauris, et varius magna euismod a. Aenean fermentum porttitor lorem nec dictum. Duis ut odio id risus facilisis porttitor. Aenean at massa pharetra, faucibus erat id, molestie magna. Quisque in facilisis neque, non vulputate tellus. Proin vel mauris et odio eleifend tristique. Duis iaculis purus turpis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean rutrum diam in nulla molestie cursus. Sed rhoncus nisi tortor, sed consectetur purus venenatis in.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          title: 'Eventos',
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          title: 'Contato',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface) => queryInterface.bulkDelete('pages', null, {}),
};
