'use strict';

/** @type {import('sequelize-cli').Migration} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const schemaConfig = require(__dirname + '../../config/schema.js');
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: {
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
      },
      username: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
      },
      phone_number: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      first_name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      last_name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      role: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      date_of_birth: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      avatar: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
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
    return queryInterface.dropTable('users');
  },
};
