/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "p_reporter",
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
      tableName: "p_reporter",
      timestamps: false,
    }
  );
};
