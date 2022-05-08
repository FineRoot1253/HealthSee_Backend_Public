/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
      "p_evaluation_view",
      {
        PEV_Code: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          primaryKey: true,
          primaryKey: true,
          comment: "null",
          autoIncrement: true,
        },
        PEV_Writer_NickName: {
          type: DataTypes.STRING(16),
          allowNull: false,
          comment: "null",
        },
        PEV_State: {
          type: DataTypes.TINYINT,
          allowNull: false,
          defaultValue: "0",
          comment: "null",
        },
        PEV_Content: {
          type: DataTypes.STRING(1000),
          allowNull: false,
          comment: "null",
        },
        PEV_Creation_Date: {
          type: DataTypes.DATE,
          allowNull: false,
          comment: "null",
        },
        Plan_PL_Code: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          primaryKey: true,
          comment: "null",
          references: {
            model: "plan",
            key: "PL_Code",
          },
        },
        PE_Report_Count: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
      },
      {
        tableName: "p_evaluation_view",
        timestamps: false,
      }
    );
  };
  