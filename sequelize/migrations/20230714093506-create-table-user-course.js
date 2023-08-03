'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('user_courses', {
      id: {
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
      },
      user_id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        references: {
          model: {
            tableName: 'users',
          },
          key: 'id',
        },
      },
      course_id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        references: {
          model: {
            tableName: 'courses',
          },
          key: 'id',
        },
      },

      is_deleted: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
      },

      created_at: {
        type: Sequelize.DataTypes.DATE,
      },
      updated_at: {
        type: Sequelize.DataTypes.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('user-courses');
  },
};
