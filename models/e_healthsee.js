/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "E_Healthsee",
    {
      EHE_Code: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        primaryKey: true,
        comment: "null",
        autoIncrement: true,
      },
      EHE_Push_NickName: {
        type: DataTypes.STRING(16),
        allowNull: false,
        comment: "null",
      },
      EHE_Creation: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "null",
      },
      Exercise_EX_Name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true,
        comment: "null",
        references: {
          model: "Exercise",
          key: "EX_Name",
        },
      },
    },
    {
      tableName: "E_Healthsee",
      timestamps: false,
    }
  );
};
