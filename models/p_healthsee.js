/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "p_healthsee",
    {
      PHE_Code: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        primaryKey: true,
        comment: "null",
        autoIncrement: true,
      },
      PHE_Push_NickName: {
        type: DataTypes.STRING(16),
        allowNull: false,
        comment: "null",
      },
      PHE_Creation: {
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
    },
    {
      tableName: "p_healthsee",
      timestamps: false,
    }
  );
};
