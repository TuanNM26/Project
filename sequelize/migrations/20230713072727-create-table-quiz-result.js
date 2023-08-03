'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('quiz_results', {
      id: {
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
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

      lesson_id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        references: {
          model: {
            tableName: 'lessons',
          },
          key: 'id',
        },
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
      is_submit: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
      },
      started_at: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      total_correct: {
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 0,
      },
      status: { type: Sequelize.DataTypes.STRING, defaultValue: 'Doing' },
      created_at: {
        type: Sequelize.DataTypes.DATE,
      },
      updated_at: {
        type: Sequelize.DataTypes.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('quiz_results');
  },
};
