'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('quiz_questions', {
      id: {
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
      },
      result_id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        references: {
          model: {
            tableName: 'quiz_results',
          },
          key: 'id',
        },
      },

      question_id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        references: {
          model: {
            tableName: 'questions',
          },
          key: 'id',
        },
      },

      selected_answer: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
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
    return queryInterface.dropTable('quiz_questions');
  },
};
