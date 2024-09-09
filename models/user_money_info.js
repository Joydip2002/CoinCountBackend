'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_money_info extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_money_info.init({
    user_id: DataTypes.INTEGER,
    income: DataTypes.INTEGER,
    expense: DataTypes.INTEGER,
    saving: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_money_info',
  });
  return user_money_info;
};