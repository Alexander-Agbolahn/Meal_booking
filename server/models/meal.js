'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Meal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Meal.hasMany(models.Order, {
        foreignKey: 'mealId',
        onDelete: 'CASCADE'
      });
  
      Meal.belongsToMany(models.Menu, {
        through: 'MealMenu',
        foreignKey: 'mealId',
        onDelete: 'CASCADE'
      });
    }
  }
  Meal.init({
    mealName: DataTypes.STRING,
    price: DataTypes.FLOAT,
    imgpath: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Meal',
  });
  return Meal;
};