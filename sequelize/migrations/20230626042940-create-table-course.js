'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('courses', {
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
      name: {
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
      price: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: true,
      },
      status: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
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
    return queryInterface.dropTable('courses');
  },
};
