/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "pe_reporter",
    {
      PRE_Code: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        primaryKey: true,
        comment: "null",
        autoIncrement: true,
      },
      PRE_Reporter_NickName: {
        type: DataTypes.STRING(16),
        allowNull: false,
        comment: "null",
      },
      PRE_Creation: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "null",
      },
      P_Evaluation_PEV_Code: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        comment: "null",
        references: {
          model: "p_evaluation",
          key: "PEV_Code",
        },
      },
      P_Evaluation_Plan_PL_Code: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        comment: "null",
        references: {
          model: "p_evaluation",
          key: "Plan_PL_Code",
        },
      },
    },
    {
      tableName: "pe_reporter",
      timestamps: false,
    }
  );
};
