/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "levelOfDifficulty",
    {
      LOD_Code: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      LOD_Value: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      LOD_Type: {
        type: DataTypes.INTEGER(2),
        allowNull: true,
      },
      Exercise_EX_Name: {
        type: DataTypes.STRING(16),
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Exercise",
          key: "EX_Name",
        },
      },
    },
    {
      tableName: "levelOfDifficulty",
      timestamps: false,
    }
  );
};
