/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "p_log",
    {
      LO_Code: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        primaryKey: true,
        comment: "null",
        autoIncrement: true,
      },
      LO_Player_NickName: {
        type: DataTypes.STRING(16),
        allowNull: false,
        comment: "null",
      },
      LO_Detail: {
        type: DataTypes.STRING(1000),
      },
      LO_Timmer: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      LO_Fault: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      LO_Creation_Date: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "null",
      },
      LO_Re_Ref: {
        type: DataTypes.INTEGER(11),
        comment: "null",
      },
      LO_Index: {
        type: DataTypes.INTEGER(11),
      },
      PL_Code: {
        type: DataTypes.INTEGER(11),
        comment: "null",
        references: {
          model: "plan",
          key: "PL_Code",
        },
      },
    },
    {
      tableName: "p_log",
      timestamps: false,
    }
  );
};
