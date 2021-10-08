/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('MealMenus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      menuId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
      allowNull: false,
      references: {
        model: 'Menus',
        key: 'id',
      },
      },
      mealId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
      allowNull: false,
      references: {
        model: 'Meals',
        key: 'id',
      }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('MealMenus');
  }
};