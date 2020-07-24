module.exports = function(sequelize, DataTypes) {
  const Recipe = sequelize.define("Recipe", {
    RecipeLabel: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    Image: {
      type: DataTypes.STRING
    },
    PrepTime: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  return Recipe;
};
