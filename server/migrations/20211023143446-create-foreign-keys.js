'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. foreign key 위해 table column 넣어주기
    await queryInterface.addColumn('chefs', 'chUserId', Sequelize.INTEGER);
    await queryInterface.addColumn('reviews', 'rvUserId', Sequelize.INTEGER);
    await queryInterface.addColumn('reviews', 'rvChefId', Sequelize.INTEGER);
    await queryInterface.addColumn('courses', 'coChefId', Sequelize.INTEGER);
    await queryInterface.addColumn(
      'reservations',
      'rsUserId',
      Sequelize.INTEGER
    );
    await queryInterface.addColumn(
      'reservations',
      'rsChefId',
      Sequelize.INTEGER
    );
    await queryInterface.addColumn(
      'reservations',
      'rsCourseId',
      Sequelize.INTEGER
    );
    await queryInterface.addColumn(
      'reservations',
      'rsReviewId',
      Sequelize.INTEGER
    );

    // foreign key 만들어주기
    await queryInterface.addConstraint('chefs', {
      fields: ['chUserId'],
      type: 'foreign key',
      name: 'chUserIdFK',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    await queryInterface.addConstraint('reviews', {
      fields: ['rvUserId'],
      type: 'foreign key',
      name: 'rvUserIdFK',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('reviews', {
      fields: ['rvChefId'],
      type: 'foreign key',
      name: 'rvChefIdFK',
      references: {
        table: 'chefs',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('courses', {
      fields: ['coChefId'],
      type: 'foreign key',
      name: 'coChefIdFK',
      references: {
        table: 'chefs',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('reservations', {
      fields: ['rsUserId'],
      type: 'foreign key',
      name: 'rsUserIdFK',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('reservations', {
      fields: ['rsChefId'],
      type: 'foreign key',
      name: 'rsChefIdFK',
      references: {
        table: 'chefs',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('reservations', {
      fields: ['rsCourseId'],
      type: 'foreign key',
      name: 'rsCourseIdFK',
      references: {
        table: 'courses',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('reservations', {
      fields: ['rsReviewId'],
      type: 'foreign key',
      name: 'rsReviewIdFK',
      references: {
        table: 'reviews',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },
  down: async (queryInterface, Sequelize) => {
    // 만든 foreign key 지워주기
    await queryInterface.removeConstraint('contents', 'userIdFK');
    await queryInterface.removeConstraint('contents', 'wordIdFK');
    // 만든 column 지워주기
    await queryInterface.removeColumn('chefs', 'chUserId');
    await queryInterface.removeColumn('reviews', 'rvUserId');
    await queryInterface.removeColumn('reviews', 'rvChefId');
    await queryInterface.removeColumn('courses', 'coChefId');
    await queryInterface.removeColumn('reservations', 'rsUserId');
    await queryInterface.removeColumn('reservations', 'rsChefId');
    await queryInterface.removeColumn('reservations', 'rsCourseId');
    await queryInterface.removeColumn('reservations', 'rsReviewId');
  },
};