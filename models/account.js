/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "account",
    {
      AC_NickName: {
        type: DataTypes.STRING(16),
        allowNull: false,
        primaryKey: true,
      },
      AC_Name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      AC_Platform: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      AC_Platform_Account: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      AC_Creation_Date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      AC_Last_Access_Date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      AC_Reported_Count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: "0",
      },
      AC_State: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: "1",
      },
    },
    {
      tableName: "account",
      timestamps: false,
    }
  );
};
