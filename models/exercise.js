/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "exercise",
    {
      EX_Name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true,
        comment: "null",
      },
      EX_KO_Name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        comment: "null",
      },
      EX_Video: {
        type: DataTypes.STRING(45),
        allowNull: true,
        comment: "null",
      },
      EX_Description: {
        type: DataTypes.STRING(1000),
        allowNull: false,
        comment: "null",
      },
      EX_Creation_Date: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "null",
      },
      EX_Update_Date: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "null",
      }
    },
    {
      tableName: "exercise",
      timestamps: false,
    }
  );
};
