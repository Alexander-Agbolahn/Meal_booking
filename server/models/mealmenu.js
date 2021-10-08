/* eslint-disable no-extra-semi */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MealMenu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  MealMenu.init({
    menuId: DataTypes.INTEGER,
    mealId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MealMenu',
  });
  return MealMenu;
};