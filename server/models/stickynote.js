'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StickyNote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  StickyNote.init({
    text: DataTypes.TEXT,
    positionX: DataTypes.STRING,
    positionY: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'StickyNote',
  });
  return StickyNote;
};