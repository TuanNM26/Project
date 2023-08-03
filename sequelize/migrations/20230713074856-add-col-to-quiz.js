'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn('quizzes', 'total_question', {
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 10,
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('quizzes', 'total_question');
  },
};
