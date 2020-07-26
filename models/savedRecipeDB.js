/* eslint-disable prettier/prettier */
module.exports = function(sequelize, DataTypes) {
  const SavedRecipe = sequelize.define("SavedRecipe", {
    RecipeLabel: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    Image: {
      type: DataTypes.STRING,
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
      foreignKey: "UserId",
      targetKey: "id",
    });
  };
  return SavedRecipe;
};
