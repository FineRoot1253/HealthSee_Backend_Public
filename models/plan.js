/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "plan",
    {
      PL_Code: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        comment: "null",
        autoIncrement: true,
      },
      PL_Writer_NickName: {
        type: DataTypes.STRING(16),
        allowNull: false,
        comment: "null",
      },
      PL_Title: {
        type: DataTypes.STRING(16),
        allowNull: false,
        comment: "null",
      },
      PL_RestTIme: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: "0",
        comment: "null",
      },
      PL_Description: {
        type: DataTypes.STRING(1000),
        allowNull: false,
        comment: "null",
      },
      PL_Creation_Date: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "null",
      },
      PL_Routin: {
        type: DataTypes.STRING(1000),
        allowNull: false,
        comment: "null",
      },
      PL_Scope: {
        type: DataTypes.INTEGER(4),
        allowNull: false,
        defaultValue: "1",
        comment: "null",
      },
    },
    {
      tableName: "plan",
      timestamps: false,
    }
  );
};
