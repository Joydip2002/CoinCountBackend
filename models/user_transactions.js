'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_transactions.init({
    transaction_type: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    customer_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user_transactions',
  });
  return user_transactions;
};