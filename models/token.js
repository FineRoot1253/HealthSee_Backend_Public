/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
      "token",
      {
        TK_Refresh_Token: {
          type: DataTypes.STRING(200),
          allowNull: false,
          primaryKey: true,
        },
        TK_NickName: {
          type: DataTypes.STRING(16),
          allowNull: true,
        },
        TK_Platform_Account: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        TK_Creation_Date: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        tableName: "token",
        timestamps: false,
      }
    );
  };
  