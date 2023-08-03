'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('questions', {
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

      question: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      type: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
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
    return queryInterface.dropTable('questions');
  },
};
