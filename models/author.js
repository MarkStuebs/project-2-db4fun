'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Author extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Author.hasOne(models.User, {foreignKey: 'authorId'});
      Author.hasMany(models.Journal, { foreignKey: "authorId" });
    }
  };
  Author.init({
    name: DataTypes.STRING,
    bio: DataTypes.TEXT,
    valediction: DataTypes.STRING,
    imageURL: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Author',
  });
  return Author;
};
