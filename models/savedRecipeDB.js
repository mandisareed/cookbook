/* eslint-disable prettier/prettier */
module.exports = function(sequelize, DataTypes) {
  const SavedRecipe = sequelize.define("SavedRecipe", {
    RecipeUri: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    RecipeLabel: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    Image: {
      type: DataTypes.TEXT,
    },
    PrepTime: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
  });
  SavedRecipe.associate = function(models) {
    SavedRecipe.belongsTo(models.User, {
      onDelete: "cascade",
    });
  };
  return SavedRecipe;
};
