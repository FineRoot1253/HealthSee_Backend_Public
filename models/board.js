/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "board",
    {
      BO_Code: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      BO_Writer_NickName: {
        type: DataTypes.STRING(16),
        allowNull: false,
      },
      BO_Title: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      BO_Content: {
        type: DataTypes.STRING(2000),
        allowNull: false,
      },
      BO_Hit: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: "0",
      },
      BO_Creation_Date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      BO_State: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: "0",
      },
    },
    {
      tableName: "board",
      timestamps: false,
    }
  );
};
