'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('wallets', {
      id: {
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
      },
      user_id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: true,
        references: {
          model: {
            tableName: 'users',
          },
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      current_balance: {
        type: Sequelize.DataTypes.FLOAT,
        defaultValue: 0,
      },
      previous_balance: {
        type: Sequelize.DataTypes.FLOAT,
        defaultValue: 0,
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
    return queryInterface.dropTable('wallets');
  },
};
