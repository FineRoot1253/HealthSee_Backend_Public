/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "b_comment_view",
    {
      BC_Code: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      BC_Writer_NickName: {
        type: DataTypes.STRING(16),
        allowNull: false,
      },
      BC_Content: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      BC_Creation_Date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      BC_Re_Ref: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      Board_BO_Code: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        references: {
          model: "board",
          key: "BO_Code",
        },
      },
      BC_State: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: "0",
      },
      BC_Report_Count: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "b_comment_view",
      timestamps: false,
    }
  );
};
