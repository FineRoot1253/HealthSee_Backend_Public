/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "ee_Reporter",
    {
      ERE_Code: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        primaryKey: true,
        comment: "null",
        autoIncrement: true,
      },
      ERE_Reporter_NickName: {
        type: DataTypes.STRING(16),
        allowNull: false,
        comment: "null",
      },
      ERE_Creation_Date: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "null",
      },
      E_Evaluation_EEV_Code: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        comment: "null",
        references: {
          model: "E_Evaluation",
          key: "EEV_Code",
        },
      },
      E_Evaluation_Exercise_EX_Name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true,
        comment: "null",
        references: {
          model: "E_Evaluation",
          key: "Exercise_EX_Name",
        },
      },
    },
    {
      tableName: "ee_Reporter",
      timestamps: false,
    }
  );
};
