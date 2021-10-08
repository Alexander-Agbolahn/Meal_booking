'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Menu.belongsToMany(models.Meal, {
        through: 'MealMenu',
        foreignKey: 'menuId'
      });
    }
  }
  Menu.init({
    available: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Menu',
  });
  return Menu;
};