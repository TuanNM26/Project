'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('quizzes', {
      id: {
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
      },
      created_by: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        references: {
          model: {
            tableName: 'users',
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
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      pass_score: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
      },
      total_time: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: 'Draft',
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
    return queryInterface.dropTable('quizzes');
  },
};
