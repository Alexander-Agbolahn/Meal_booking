'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({models}) {
      // define association here
      Order.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
  
      Order.belongsTo(models.Meal, {
        foreignKey: 'mealId',
        onDelete: 'CASCADE'
      });
      
    }
  }
  Order.init({
    total: DataTypes.FLOAT,
    type: DataTypes.STRING,
    status: DataTypes.STRING,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};