/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "service",
    {
      S_Code: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        primaryKey: true,
        comment: "null",
        autoIncrement: true,
      },
      S_Writer_NickName: {
        type: DataTypes.STRING(16),
        allowNull: false,
        comment: "null",
      },
      S_Title: {
        type: DataTypes.STRING(20),
        allowNull: false,
        comment: "null",
      },
      S_File: {
        type: DataTypes.STRING(45),
        allowNull: true,
        comment: "null",
      },
      S_Description: {
        type: DataTypes.STRING(1000),
        allowNull: false,
        comment: "null",
      },
      S_State: {
        type: DataTypes.INTEGER(4),
        allowNull: false,
        comment: "null",
      },
      S_Answer: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: "null",
      },
      S_Category: {
        type: DataTypes.STRING(20),
        allowNull: false,
        comment: "null",
      },
      S_Creation_Date: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "null",
      },
    },
    {
      tableName: "service",
      timestamps: false,
    }
  );
};
